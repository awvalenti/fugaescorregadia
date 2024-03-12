import { spawn } from 'child_process'
import { createWriteStream, exists, fstat } from 'fs'
import { access, mkdir, readFile } from 'fs/promises'
import { MPEGDecoderWebWorker } from 'mpg123-decoder'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { basename, dirname } from 'path'

// TODO Improve this solution. It works for now in dev environment.
process.on('exit', () => {
  spawn('killall', ['aplay'])
})

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    // console.time('new MPEGDecoderWebWorker')
    ret._decoder = new MPEGDecoderWebWorker()
    // console.timeEnd('new MPEGDecoderWebWorker')

    // ret._decodedFilenamesCache = new Map();

    ret._tmpDir = join(tmpdir(), 'sound-player')

    // console.time('decoder.ready')
    await ret._decoder.ready
    // console.timeEnd('decoder.ready')

    return ret
  }

  free() {
    this._decoder.free()
  }

  async load(filePath, options) {
    const createAplayArgs = (filePath, firstArgs = []) => [
      ...firstArgs,
      ...['-B', '50000', '-q', '--'],
      filePath
    ]

    let aplayProcess, tmpFilePath

    if (!filePath.endsWith('wav')) {
      const dirName = dirname(filePath)
      const tmpFileDirName = join(this._tmpDir, dirName)
      await mkdir(tmpFileDirName, { recursive: true })
      const baseName = basename(filePath)
      tmpFilePath = join(tmpFileDirName, baseName)

      try {
        // Checks decoded file existence
        await access(tmpFilePath)
      } catch {
        // If not exists, create it
        const writeStream = createWriteStream(tmpFilePath)
        await this._decodeAndInterleave(filePath, writeStream)
      }
    }

    return {
      start() {
        if (filePath.endsWith('wav')) {
          aplayProcess = spawn('aplay', createAplayArgs(filePath))

        } else {
          spawnAplay()
        }

        function spawnAplay() {
          aplayProcess = spawn('aplay', createAplayArgs(tmpFilePath,
            ['-c', '2', '-f', 'float_le', '-r', '44100']))
          if (options.loop) {
            aplayProcess.on('close', () => { spawnAplay() })
          }
        }
      },

      stop() {
        aplayProcess.kill('SIGTERM')
      },

      pause() {
        aplayProcess.kill('SIGSTOP')
      },

      resume() {
        aplayProcess.kill('SIGCONT')
      },

    }
  }

  async _decodeAndInterleave(filePath, writeStream) {
    // // console.time('readfile')
    const encodedBuffer = await readFile(filePath)
    // // console.timeEnd('readfile')

    // console.time('decode ' + filePath)
    const decoded = await this._decoder.decode(encodedBuffer, {
      outputFormat: 's16',
      numberOfChannels: 2,
      sampleRate: 44100
    })
    // console.timeEnd('decode ' + filePath)

    console.time('interleave ' + filePath)

    return Promise.all([this._decoder.reset(), new Promise((resolve, reject) => {
      const
        samplesPerChunkPerChannel = 32768,

        samplesByChannel = decoded.channelData,

        channelsCount = samplesByChannel.length,

        samplesCountPerChannel = Math.max(...samplesByChannel.map(s => s.length)),

        fullChunkSize = samplesPerChunkPerChannel * channelsCount,
        fullChunksCount = Math.floor(samplesCountPerChannel / samplesPerChunkPerChannel),
        residualChunkSize = channelsCount * samplesCountPerChannel - fullChunkSize * fullChunksCount,

        fullChunk = new Float32Array(fullChunkSize)

      function processChunk(chunkIndex) {
        function fill(chunk) {
          for (let i = 0; i < chunk.length / channelsCount; ++i) {
            for (let j = 0; j < channelsCount; j++) {
              // TODO Improve readability by using two variables, one for
              // output index, another one for input index
              chunk[channelsCount * i + j] = samplesByChannel[j][chunkIndex * samplesPerChunkPerChannel + i]
            }
          }
        }

        if (chunkIndex < fullChunksCount) {
          fill(fullChunk)
          writeStream.write(Buffer.from(fullChunk.buffer), err => {
            if (err) {
              writeStream.close()
              reject(err)
            } else {
              processChunk(chunkIndex + 1)
            }
          })
        } else {
          const residualChunk = new Float32Array(residualChunkSize)
          fill(residualChunk)
          writeStream.write(Buffer.from(residualChunk.buffer), err => {
            writeStream.close()
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }
      }
      processChunk(0)
    })])
  }

}

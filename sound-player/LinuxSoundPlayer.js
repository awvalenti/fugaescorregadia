import { spawn } from 'child_process'
import { log } from 'console'
import { createWriteStream } from 'fs'
import { mkdir, readFile } from 'fs/promises'
import { MPEGDecoderWebWorker } from 'mpg123-decoder'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { basename, dirname } from 'path'

// // TODO Find an actual solution
// // WIP finishing all aplay processes when ending Node process
// const killall = () => {
//   spawn('killall', ['aplay'])
//   process.exit()
// }
// process.on('exit', killall)
// process.on('uncaughtException', killall)
// process.on('SIGINT', killall)
// process.on('SIGTERM', killall)

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    // console.time('new MPEGDecoderWebWorker')
    ret._decoder = new MPEGDecoderWebWorker()
    // console.timeEnd('new MPEGDecoderWebWorker')

    ret._decodedFilenamesCache = new Map();

    // console.time('decoder.ready')
    [ret._tmpDir] = await Promise.all([
      mkdtemp(join(tmpdir(), 'sound-player-')),
      ret._decoder.ready,
    ])
    // console.timeEnd('decoder.ready')

    return ret
  }

  free() {
    this._decoder.free()
  }

  async play(soundFile) {
    const createAplayArgs = (filePath, firstArgs = []) => [
      ...firstArgs,
      ...['-B', '50000', '-q', '--'],
      filePath
    ]

    let aplayProcess

    if (soundFile.endsWith('wav')) {
      aplayProcess = spawn('aplay', createAplayArgs(soundFile))

    } else {
      const dirName = dirname(soundFile)
      const tmpFileDirName = join(this._tmpDir, dirName)
      await mkdir(tmpFileDirName, { recursive: true })
      const baseName = basename(soundFile)
      const tmpFilePath = join(tmpFileDirName, baseName)

      if (!this._decodedFilenamesCache.has(soundFile)) {
        const writeStream = createWriteStream(tmpFilePath)
        await this._decodeAndInterleave(soundFile, writeStream)
        this._decodedFilenamesCache.set(soundFile, tmpFilePath)
      }

      aplayProcess = spawn('aplay', createAplayArgs(tmpFilePath,
        ['-c', '2', '-f', 'float_le', '-r', '44100']))
    }

    return {
      stop() {
        aplayProcess.kill()
      }
    }
  }

  async _decodeAndInterleave(soundFile, writeStream) {
    // // console.time('readfile')
    const encodedBuffer = await readFile(soundFile)
    // // console.timeEnd('readfile')

    // console.time('decode ' + soundFile)
    const decoded = await this._decoder.decode(encodedBuffer, {
      outputFormat: 's16',
      numberOfChannels: 2,
      sampleRate: 44100
    })
    // console.timeEnd('decode ' + soundFile)

    console.time('interleave ' + soundFile)

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

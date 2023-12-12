import { spawn } from 'child_process';
import { log } from 'console';
import { createWriteStream } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { MPEGDecoderWebWorker } from 'mpg123-decoder';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { basename, dirname } from 'path';

// // TODO Find an actual solution
// // WIP finishing all aplay processes when ending Node process
// const killall = () => {
//   spawn('killall', ['aplay'])
//   process.exit()
// }
// process.on('exit', killall)
// process.on('uncaughtException', killall);
// process.on('SIGINT', killall);
// process.on('SIGTERM', killall);

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    // console.time('new MPEGDecoderWebWorker')
    ret._decoder = new MPEGDecoderWebWorker();
    // console.timeEnd('new MPEGDecoderWebWorker')

    ret._decodedFilenamesCache = new Map();

    // console.time('decoder.ready')
    [ret._tmpDir] = await Promise.all([
      mkdtemp(join(tmpdir(), 'sound-player-')),
      ret._decoder.ready,
    ]);
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

    const resetPromise = this._decoder.reset()

    // TODO Accomodate possibility of more than two channels
    const [leftSamples, rightSamples] = decoded.channelData

    console.time('interleave ' + soundFile)

    // FIXME using the exact size of sound, to test the residual chunk part
    const FULL_CHUNK_SIZE = 362788

    const outputFullChunk = new Float32Array(FULL_CHUNK_SIZE)
    const fullChunksCount = Math.floor(leftSamples.length / FULL_CHUNK_SIZE)
    const residualChunkSize = leftSamples.length % FULL_CHUNK_SIZE

    const processPromise = new Promise((resolve, reject) => {
      function processChunk(outputChunkIndex) {
        if (outputChunkIndex < fullChunksCount) {
          // FIXME
          // FULL_CHUNK_SIZE probably doesn't play well with i * 2. Should
          // remove the * 2 part.
          for (let i = 0; i < FULL_CHUNK_SIZE; ++i) {
            const inputSampleIndex = outputChunkIndex * FULL_CHUNK_SIZE + i
            outputFullChunk[i * 2] = leftSamples[inputSampleIndex]
            outputFullChunk[i * 2 + 1] = rightSamples[inputSampleIndex]
          }
          writeStream.write(Buffer.from(outputFullChunk.buffer), err => {
            if (err) {
              writeStream.close()
              reject(err)
            } else {
              processChunk(outputChunkIndex + 1)
            }
          })
        } else {
          const outputResidualChunk = new Float32Array(residualChunkSize)
          console.log({ residualChunkSize });

          for (let i = 0; i < residualChunkSize; ++i) {
            const inputSampleIndex = outputChunkIndex * FULL_CHUNK_SIZE + i
            outputResidualChunk[i * 2] = leftSamples[inputSampleIndex]
            outputResidualChunk[i * 2 + 1] = rightSamples[inputSampleIndex]
          }
          writeStream.write(Buffer.from(outputResidualChunk.buffer), err => {
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
    })

    return Promise.all([resetPromise, processPromise])
  }

}

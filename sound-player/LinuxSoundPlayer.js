import { spawn } from 'child_process';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { MPEGDecoderWebWorker } from 'mpg123-decoder';
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { basename, dirname } from 'path';

// WIP finishing all aplay processes when ending Node process
const killall = () => {
  spawn('killall', ['aplay'])
  process.exit()
}
process.on('exit', killall)
process.on('uncaughtException', killall);
process.on('SIGINT', killall);
process.on('SIGTERM', killall);

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
    let aplayProcess

    if (soundFile.endsWith('wav')) {
      aplayProcess = spawn('aplay', ['-q', '--', soundFile])
      aplayProcess.on('exit', () => { })

    } else {
      const dirName = dirname(soundFile)
      const tmpFileDirName = join(this._tmpDir, dirName)
      await mkdir(tmpFileDirName, { recursive: true })
      const baseName = basename(soundFile)
      const tmpFilePath = join(tmpFileDirName, baseName)

      let buffer = this._decodedFilenamesCache.get(soundFile)
      if (!buffer) {
        buffer = await this._decodeAndInterleave(soundFile)
        await writeFile(tmpFilePath, buffer)
        this._decodedFilenamesCache.set(soundFile, tmpFilePath)
      }

      aplayProcess = spawn('aplay',
        ['-q', '-c', '2', '-f', 'float_le', '-r', '44100', '--', tmpFilePath])
    }

    return {
      stop() {
        aplayProcess.kill()
      }
    }
  }

  async _decodeAndInterleave(soundFile) {
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

    const [leftSamples, rightSamples] = decoded.channelData
    // console.time('interleave ' + soundFile)
    const interleavedSamples = new Float32Array(leftSamples.length + rightSamples.length)
    for (let i = 0; i < leftSamples.length; ++i) {
      interleavedSamples[i * 2] = leftSamples[i];
      interleavedSamples[i * 2 + 1] = rightSamples[i];
    }
    // console.timeEnd('interleave ' + soundFile)

    await resetPromise

    return Buffer.from(interleavedSamples.buffer)
  }

}

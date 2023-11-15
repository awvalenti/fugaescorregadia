import terminalKit from 'terminal-kit';
import { exec, spawn } from 'child_process';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { MPEGDecoderWebWorker } from 'mpg123-decoder';
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

// import path from 'path';
import { basename, dirname } from 'path';
import { createReadStream } from 'fs';
// import util from 'util';

// const basename = util.promisify(path.basename)
// const dirname = util.promisify(path.dirname)

// import fs from 'fs';

// let killed = false

// console.log(1);
// const killall = () => {
//   spawn('killall', ['aplay'])
//   process.exit()
// }
// process.on('exit', killall)
// process.on("uncaughtException", killall);
// process.on("SIGINT", killall);
// process.on("SIGTERM", killall);

const term = terminalKit.terminal

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    // console.time('new MPEGDecoderWebWorker')
    ret._decoder = new MPEGDecoderWebWorker();
    // console.timeEnd('new MPEGDecoderWebWorker')

    ret._cache = new Map();

    // console.time('decoder.ready')
    const bla = await Promise.all([
      mkdtemp(join(tmpdir(), 'sound-player-')),
      ret._decoder.ready,
    ]);
    // console.timeEnd('decoder.ready')

    [ret._tmpDir] = bla;

    // console.log({bla, tmpDir: ret._tmpDir});

    return ret
  }

  free() {
    this._decoder.free()
  }

  async play(soundFile) {
    let aplayProcess

    if (soundFile.endsWith('wav')) {
      // console.time('wav')

      // TODO Avoid code injection
      aplayProcess = spawn('aplay', ['-q', '--', soundFile])
      // aplayProcess = exec('aplay -q -- ${soundFile}')

      aplayProcess.on('exit', () => {
        // killed = true
        console.log('aplay process exited')
        console.timeEnd('kill')
      })

    } else {
      console.time('song start')

      const dirName = dirname(soundFile)
      const tmpFileDirName = join(this._tmpDir, dirName)
      await mkdir(tmpFileDirName, { recursive: true })
      const baseName = basename(soundFile)
      const tmpFilePath = join(tmpFileDirName, baseName)

      let buffer = this._cache.get(soundFile)
      if (!buffer) {
        // console.time('_decodeAndInterleave ' + soundFile)
        buffer = await this._decodeAndInterleave(soundFile)
        // console.log('outro tmpDir:', this._tmpDir);

        this._cache.set(soundFile, buffer)

        // this._cache.set(soundFile, tmpFilePath)

        console.time('writeFile')
        await writeFile(tmpFilePath, buffer)
        console.timeEnd('writeFile')
        // console.timeEnd('_decodeAndInterleave ' + soundFile)
      }
      // aplayProcess.stdin.cork()

      console.time('spawn: creating aplay process')
      aplayProcess = spawn('aplay', ['-q', '-c', '2', '-f', 'float_le', '-r', '44100', tmpFilePath])

      // aplayProcess = spawn('aplay', ['-q', '-c', '2', '-f', 'float_le', '-r', '44100'])

      // const readStream = createReadStream(tmpFilePath)
      // readStream.on('end', () => {
      //   console.time('kill')
      //   aplayProcess.stdin.end();
      // })
      // readStream.pipe(aplayProcess.stdin)
      // aplayProcess.stdin.on('error', () => {})

      // aplayProcess = exec(`aplay -q -c 2 -f float_le -r 44100 -- ${tmpFilePath}`)
      // const aplayProcess = exec('aplay -q -c 2 -f float_le -r 44100')
      // console.timeEnd('spawn: creating aplay process')

      // aplayProcess.stdin.cork()
      // aplayProcess.stdin.write(buffer)
      // process.nextTick(() => {
      //   aplayProcess.stdin.uncork()
      // })

      // // console.time('stdin.write(buffer)')
      // const SIZE = 1024 * 1024
      // let i = 0
      // let subBuffer = Buffer.from(bufferToPlay.buffer, 0, SIZE)
      // console.log(subBuffer.length)
      // const loop = () => {
      //   aplayProcess.stdin.write(subBuffer, () => {
      //     setTimeout(() => {
      //       if (!killed) {
      //         ++i
      //         // term.color('white').moveTo(4, 15, `     ${i}     `);
      //         subBuffer = Buffer.from(bufferToPlay.buffer, i * SIZE, SIZE)
      //         loop()
      //       }
      //     }, 2000);
      //     // // console.time('stdin.destroy()')
      //     // aplayProcess.stdin.destroy()
      //     // // console.timeEnd('stdin.destroy()')
      //   })
      //   // // console.timeEnd('stdin.write(buffer)')
      // }
      // loop()
      console.timeEnd('song start')
      // console.log('pid:', aplayProcess.pid)

      aplayProcess.on('exit', () => {
        // killed = true
        console.log('aplay process exited')
        console.timeEnd('kill')
      })

    }

    return {
      stop() {
        // killed = true
        // aplayProcess.stdin.destroy()
        console.time('kill')
        // aplayProcess.stdin.destroy()
        aplayProcess.kill()
        // spawn('kill', [aplayProcess.pid])
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

    this._decoder.reset()

    const [leftSamples, rightSamples] = decoded.channelData
    // console.time('interleave ' + soundFile)
    const interleavedSamples = new Float32Array(leftSamples.length + rightSamples.length)
    for (let i = 0; i < leftSamples.length; ++i) {
      interleavedSamples[i * 2] = leftSamples[i];
      interleavedSamples[i * 2 + 1] = rightSamples[i];
    }
    // console.timeEnd('interleave ' + soundFile)

    return Buffer.from(interleavedSamples.buffer)
  }

}

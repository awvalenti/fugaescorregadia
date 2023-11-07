import terminalKit from 'terminal-kit';
import { exec, spawn } from 'child_process';
import { readFileSync } from 'fs';
import { MPEGDecoder } from 'mpg123-decoder';
// import fs from 'fs';

// let killed = false

const term = terminalKit.terminal

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    // console.time('new MPEGDecoder')
    ret._decoder = new MPEGDecoder();
    // console.timeEnd('new MPEGDecoder')

    ret._cache = new Map()

    // console.time('decoder.ready')
    await ret._decoder.ready;
    // console.timeEnd('decoder.ready')

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

      aplayProcess.on('exit', () => {
        // killed = true
        console.log('aplay process exited')
        console.timeEnd('kill')
      })

    } else {
      console.time('song start')

      console.time('spawn: creating aplay process')
      aplayProcess = spawn('aplay', ['-q', '-c', '2', '-f', 'float_le', '-r', '44100'])
      // const aplayProcess = exec('aplay -q -c 2 -f float_le -r 44100')
      console.timeEnd('spawn: creating aplay process')

      let bufferToPlay = this._cache.get(soundFile)
      if (!bufferToPlay) {
        // console.time('_decodeAndInterleave ' + soundFile)
        bufferToPlay = await this._decodeAndInterleave(soundFile)
        this._cache.set(soundFile, bufferToPlay)
        // console.timeEnd('_decodeAndInterleave ' + soundFile)
      }
      // aplayProcess.stdin.cork()

      // aplayProcess.stdin.cork()
      aplayProcess.stdin.write(bufferToPlay)
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
      console.log('pid:', aplayProcess.pid)

    }

    return {
      stop() {
        // killed = true
        // aplayProcess.stdin.destroy()
        console.time('kill')
        // aplayProcess.stdin.destroy()
        // aplayProcess.kill()
        spawn('kill', [aplayProcess.pid])
      }
    }
  }

  async _decodeAndInterleave(soundFile) {
    // // console.time('readfile')
    // TODO make async
    const encodedBuffer = readFileSync(soundFile)
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

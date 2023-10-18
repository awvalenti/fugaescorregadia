import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { MPEGDecoder } from 'mpg123-decoder';

export class LinuxSoundPlayer {

  static async create() {
    const ret = new LinuxSoundPlayer()

    console.time('new MPEGDecoder')
    ret._decoder = new MPEGDecoder();
    console.timeEnd('new MPEGDecoder')

    ret._cache = new Map()

    console.time('decoder.ready')
    await ret._decoder.ready;
    console.timeEnd('decoder.ready')

    return ret
  }

  async play(soundFile) {
    if (soundFile.endsWith('wav')) {
      console.time('wav')
      exec(`aplay -q -- ${soundFile}`, () => {
        console.timeEnd('wav')
      })
    } else {
      console.time('exec: creating aplay process')
      this._aplayProcess = exec('aplay -B 50000 -q -c 2 -f float_le -r 44100')
      console.timeEnd('exec: creating aplay process')

      let bufferToPlay = this._cache.get(soundFile)
      if (!bufferToPlay) {
        console.time('decode')
        this._cache.set(soundFile, bufferToPlay = await this._decode(soundFile))
        console.timeEnd('decode')
      }
      // this._aplayProcess.stdin.cork()

      console.time('stdin.write(buffer)')
      this._aplayProcess.stdin.write(bufferToPlay)
      console.timeEnd('stdin.write(buffer)')

      setTimeout(() => {
        this._aplayProcess.kill()
      }, 800);
      // this._aplayProcess.stdin.end()
      // process.nextTick(() => {
      //   this._aplayProcess.stdin.uncork()
      // })
    }
  }

  async _decode(soundFile) {
    // console.time('readfile')
    const encodedBuffer = readFileSync(soundFile)
    // console.timeEnd('readfile')

    // console.time('decode')
    const decoded = await this._decoder.decode(encodedBuffer, {
      outputFormat: 's16',
      numberOfChannels: 2,
      sampleRate: 44100
    })
    // console.timeEnd('decode')

    this._decoder.reset()

    const [leftSamples, rightSamples] = decoded.channelData

    // console.time('interleave')
    const interleavedSamples = new Float32Array(leftSamples.length + rightSamples.length)
    for (let i = 0; i < leftSamples.length; ++i) {
      interleavedSamples[i * 2] = leftSamples[i];
      interleavedSamples[i * 2 + 1] = rightSamples[i];
    }
    // console.timeEnd('interleave')

    return Buffer.from(interleavedSamples.buffer)
  }

}

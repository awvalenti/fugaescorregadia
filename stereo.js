import { exec } from 'child_process';
import { readFileSync } from 'fs';

// import { FLACDecoder } from '@wasm-audio-decoders/flac';
// const decoder = new FLACDecoder();

import { MPEGDecoder } from 'mpg123-decoder';

console.time('new')
const decoder = new MPEGDecoder();
console.timeEnd('new')

console.time('ready')
await decoder.ready;
console.timeEnd('ready')

console.time('exec')
const childProcess = exec(`aplay -q -c 2 -f float_le -r 44100`)
console.timeEnd('exec')

async function linuxPlaySound(file) {
  if (file.endsWith('wav')) {
    console.time('wav')
    exec(`aplay -q -- ${file}`, () => {
      console.timeEnd('wav')
    })
  } else {
    console.time('readfile')
    const encodedBuffer = readFileSync(file)
    console.timeEnd('readfile')

    console.time('decode')
    const decoded = await decoder.decode(encodedBuffer, {
      outputFormat: 's16',
      numberOfChannels: 2,
      sampleRate: 44100
    })
    console.timeEnd('decode')

    decoder.reset()

    const [leftSamples, rightSamples] = decoded.channelData

    console.time('interleave')
    const interleavedSamples = new Float32Array(leftSamples.length + rightSamples.length)
    for (let i = 0; i < leftSamples.length; ++i) {
      interleavedSamples[i * 2] = leftSamples[i];
      interleavedSamples[i * 2 + 1] = rightSamples[i];
    }
    console.timeEnd('interleave')

    childProcess.stdin.cork()
    childProcess.stdin.write(Buffer.from(interleavedSamples.buffer))
    process.nextTick(() => {
      childProcess.stdin.uncork()
    })
  }
}

function playSound(file) {
  const isWin = process.platform === "win32";
  // TODO avoid code injection
  if (isWin) {
    windowsPlaySound(file)
  } else {
    linuxPlaySound(file)
  }
}

playSound('stereo.mp3')
setTimeout(() => {
  process.exit(0)
}, 2000);

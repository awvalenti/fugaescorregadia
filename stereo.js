import { exec } from 'child_process';
import path from 'path';
import { readFileSync } from 'fs';

// import { FLACDecoder } from '@wasm-audio-decoders/flac';
// const decoder = new FLACDecoder();

import { MPEGDecoder } from 'mpg123-decoder';

// console.time('new')
const decoder = new MPEGDecoder();
// console.timeEnd('new')
// console.time('ready')
await decoder.ready;
// console.timeEnd('ready')

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
    // console.time('readfile')
    const encodedBuffer = readFileSync(file)
    // console.timeEnd('readfile')
    // console.time('decode')
    const decoded = await decoder.decode(encodedBuffer, {
      outputFormat: 's16',
      numberOfChannels: 2,
      sampleRate: 44100
    })
    // console.timeEnd('decode')
    // console.time('free')
    decoder.reset()
    // console.timeEnd('free')
    // const data = decoded.channelData[1]

    const [leftSamples, rightSamples] = decoded.channelData

    const data = new Float32Array(leftSamples.length * 2)
    for (let i = 0; i < leftSamples.length * 2; i += 2) {
      // Combine left and right samples into interleaved stereo format
      data[i] = leftSamples[i];
      data[i + 1] = rightSamples[i];
    }

    console.log(leftSamples[0], rightSamples[0], data[0], data[1]);
    console.log(leftSamples[1], rightSamples[1], data[2], data[3]);

    // Convert interleaved samples to a Buffer
    const audioBuffer = Buffer.from(data);

    childProcess.stdin.cork()
    childProcess.stdin.write(audioBuffer)
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
}, 900);

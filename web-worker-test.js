import { MPEGDecoderWebWorker } from 'mpg123-decoder';
import { readFile } from 'fs/promises'
import { log } from 'console';

const decoder = new MPEGDecoderWebWorker();

console.time('decoder.ready');
await decoder.ready;
console.timeEnd('decoder.ready');

const soundFile = 'audio/adrift-bgm-cropped.mp3'
console.time('readFile');
const encodedBuffer = await readFile(soundFile)
console.timeEnd('readFile');

let n = 0
const i = setInterval(() => {
  log('\twaiting...', n++)
}, 500);

console.time('decode')
const decoded = await decoder.decode(encodedBuffer, {
  outputFormat: 's16',
  numberOfChannels: 2,
  sampleRate: 44100
})
console.timeEnd('decode')

clearInterval(i)

decoder.free()

log(decoded)

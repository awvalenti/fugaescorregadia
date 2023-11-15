import { spawn } from 'child_process';
import { log } from 'console';
import { createReadStream } from 'fs';
import { pipeline } from 'node:stream/promises';

const wavFilePath = 'audio/adrift-bgm-cropped.wav'
// const wavFilePath = 'audio/sunflower-street-drumloop-85bpm-163900.wav'

const aplayProcess = spawn('aplay', ['-q', '-c', '2', '-f', 'float_le', '-r', '44100'])

const { stdin } = aplayProcess
const readStream = createReadStream(wavFilePath)

function removeAllListeners() {
  stdin.removeAllListeners('error')
  readStream.removeAllListeners('end')
}

stdin.on('error', () => {
  console.log('stdin.error')
  removeAllListeners()
  readStream.close()
})

stdin.on('end', () => {
  console.log('stdin.end')
})

readStream.on('end', () => {
  console.log('readStream.end')
  stdin.end();
  removeAllListeners()
})

let i = 0
setInterval(() => {
  log('Still alive', i++)
}, 3000);

try {
  await pipeline(
    readStream,
    stdin
  )
  log('success')
} catch {
  log('catch')
} finally {
  log('finally')
}

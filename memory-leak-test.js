import { createReadStream, createWriteStream } from 'fs';

const srcPath = 'audio/adrift-bgm-cropped.wav'
const dstPath = '/tmp/test-destination-stream'

const srcStream = createReadStream(srcPath)
const dstStream = createWriteStream(dstPath)

dstStream.on('drain', () => {
  // Simulates a slow WriteStream
  setTimeout(() => {
    srcStream.resume()
  }, 20)
})

srcStream.on('end', () => {
  console.log("srcStream.on('end')");
  dstStream.end()
})

let i = 0
srcStream.on('data', (chunk) => {
  dstStream.write(chunk, (error) => {
    // No errors occur, even if destination file is removed
    if (error) console.error(error);
  })
  srcStream.pause()
  console.log('on(data)', i++)
})

let j = 0
setInterval(() => {
  console.log('Keeping process alive', j++)
}, 3000);

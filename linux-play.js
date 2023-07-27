import { MPEGDecoder } from 'mpg123-decoder';
// import { FLACDecoder } from '@wasm-audio-decoders/flac';
import fs from 'fs'
import { exec } from 'child_process'
// import { OpusDecoder } from 'opus-decoder';
// import { OggVorbisDecoder } from '@wasm-audio-decoders/ogg-vorbis';

// const decoder = new OggVorbisDecoder();
// const decoder = new OpusDecoder();

const decoder = new MPEGDecoder();
// const decoder = new FLACDecoder();

await decoder.ready;

const decoded = await decoder.decode(fs.readFileSync('start.mp3'))
console.log(decoded)
const child = exec(`aplay -q -f float_le -r ${Number(decoded.sampleRate)}`)
child.stdin.write(Buffer.from(decoded.channelData[1].buffer))
child.stdin.destroy()

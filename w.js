import { readFileSync } from 'fs';
import { FLACDecoder } from '@wasm-audio-decoders/flac';
import wav from 'wav';

const decoder = new FLACDecoder();

async function decode(file) {
  const flacBuffer = readFileSync(file)
  const decoded = await decoder.decode(flacBuffer, { outputFormat: 's16', numberOfChannels: 2, sampleRate: 44100 })
  // console.log();
  // console.log({decoded, channelData: decoded.channelData});
  const [left, right] = decoded.channelData
  const ret = Buffer.from(right.buffer)
  console.log(ret);
  // console.log(left.constructor.name)
  // console.log(left.toString());
  return ret;
  // return decoded
}

function save(decodedAudioData) {
  // Create a new WAV file writer
  const writer = new wav.FileWriter('output.wav', {
    sampleRate: 44100,  // Set the appropriate sample rate
    channels: 2,        // Stereo
    bitDepth: 16        // 16-bit
  });

  // Write the decoded audio data to the WAV file
  writer.write(decodedAudioData);

  // Close the WAV file writer
  writer.end(() => {
    console.log('WAV file saved successfully.');
    // Call the function to play the WAV file using 'aplay'
    // playAudioWithAplay();
  });
}

decoder.ready.then(() => decode('start.flac').then(save))

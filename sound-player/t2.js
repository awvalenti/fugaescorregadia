import { SoundPlayer } from "./SoundPlayer.js";
import process from 'process'

import readline from 'readline';

const player = await SoundPlayer.create()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

player.play('bgm4m.mp3')

setTimeout(() => {
  console.log('\n\nWill play second time. Type Enter when you hear a sound\n\n')
  console.time('time-to-hear')
  // player.play('bgm4m.mp3')

  // Prompt the user
  rl.question('', () => {
    // console.log('You pressed a key!');
    console.timeEnd('time-to-hear')
    // rl.close(); // Close the readline interface
    process.exit(0)
  });



}, 2500);


// // player.play('../stereo.mp3')
// setTimeout(() => {
//   console.log('Second time')
//   player.play('bgm4m.mp3')
// }, 2000);

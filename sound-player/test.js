import { SoundPlayer } from "./SoundPlayer.js";

const player = await SoundPlayer.create()

console.log('First time')
player.play('bgm4m.mp3')

// player.play('../stereo.mp3')
setTimeout(() => {
  console.log('Second time')
  player.play('bgm4m.mp3')
}, 2000);

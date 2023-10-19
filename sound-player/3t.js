import { SoundPlayer } from "./SoundPlayer.js";
// import process from 'process'

const player = await SoundPlayer.create()

const bgm = await player.play('bgm1h.mp3')

// setTimeout(async () => {
//   await player.play('../start.mp3')

//   setTimeout(async () => {
//     bgm.stop()
//     await player.play('../finish.mp3')
//     // player.free()
//   }, 100);

// }, 1000);


// // player.play('../stereo.mp3')
// setTimeout(() => {
//   console.log('Second time')
//   player.play('bgm4m.mp3')
// }, 2000);

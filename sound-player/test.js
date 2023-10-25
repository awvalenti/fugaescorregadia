import { SoundPlayer } from "./SoundPlayer.js";

const player = await SoundPlayer.create()

console.log('Starting sound')
const mediaPlayer = await player.play(process.argv[2])

setTimeout(() => {
  console.log('Pausing sound')
  setTimeout(() => {
    mediaPlayer.pause()
    console.log('finishing')
  }, 0);
}, 2000);

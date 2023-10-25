import { SoundPlayer } from "./SoundPlayer.js";

const player = await SoundPlayer.create()

// console.log('Starting BGM')
player.play(process.argv[2])

// setTimeout(() => {
//   console.log('Starting sound effect')
//   player.play('../start.mp3')
// }, 2000);

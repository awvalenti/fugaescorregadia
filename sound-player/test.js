import { SoundPlayer } from "./SoundPlayer.js";

const player = await SoundPlayer.create()

console.log('Starting sound')
const sound1 = await player.start(process.argv[2])

setTimeout(async () => {
  const sound2 = await player.start(process.argv[3])
  const sound3 = await player.start(process.argv[4])
  setTimeout(() => {
    sound1.stop()
    console.log('finishing')
  }, 2000);
}, 1000);

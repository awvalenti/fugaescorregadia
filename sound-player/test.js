import { SoundPlayer } from "./SoundPlayer.js";

const player = await SoundPlayer.create()

player.play('../stereo.mp3')
setTimeout(() => {
  player.play('../finish.mp3')

  setTimeout(() => {
    process.exit(0)
  }, 3000);

}, 2000);

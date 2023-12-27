import { spawn } from 'child_process'

process.on('exit', () => {
  spawn('killall', ['afplay'])
})

export class MacSoundPlayer {

  async prefetch(soundFile) {
    let afplayProcess

    return {
      start() {
        afplayProcess = spawn('afplay', [soundFile])
      },

      stop() {
        afplayProcess.kill('SIGTERM')
      },

      pause() {
        afplayProcess.kill('SIGSTOP')
      },

      resume() {
        afplayProcess.kill('SIGCONT')
      },
    }
  }

}

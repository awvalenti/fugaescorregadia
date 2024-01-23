import { spawn } from 'child_process'

process.on('exit', () => {
  spawn('killall', ['afplay'])
})

export class MacSoundPlayer {

  async load(filePath) {
    let afplayProcess

    return {
      start() {
        afplayProcess = spawn('afplay', [filePath])
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

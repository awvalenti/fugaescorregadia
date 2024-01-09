import { exec } from 'child_process';
import { log } from 'console';
import path from 'path';

const FORBIDDEN_CHARACTERS = /["`\n]/

export class WindowsSoundPlayer {

  async prefetch(soundFile) {
    const resolvedPath = path.resolve(soundFile)

    if (FORBIDDEN_CHARACTERS.test(resolvedPath)) {
      throw Error('Invalid sound file path: ' + resolvedPath)
    }

    const mediaPlayerProcess = exec(`
      $FilePath = "${resolvedPath}"
      $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
      $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri($FilePath)

      do
      {
        $Duration = $MediaPlayer.NaturalDuration.TotalSeconds
      }
      while ($Duration -eq 0)
      "\`n"  # Write a newline to inform sound ready

      Read-Host  # TODO Avoid echo
      $MediaPlayer.Play()

      Start-Sleep -Seconds $Duration
      `, { shell: 'powershell' }
    )

    // mediaPlayerProcess.stdout.pause()
    log(1)
    mediaPlayerProcess.stdout.setEncoding(null)
    return new Promise(resolve => {
      log(2)
      mediaPlayerProcess.stdout.on('data', (chunk) => {
        log(3, soundFile, { chunk })
        resolve({
          start() {
            mediaPlayerProcess.stdin.write('bla\n')
          },

          stop() {
            mediaPlayerProcess.kill()
          },
        })
      })
    })
  }
}

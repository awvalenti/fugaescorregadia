import { exec } from 'child_process';
import path from 'path';

const FORBIDDEN_CHARACTERS = /["`\n]/

export class WindowsSoundPlayer {

  start(soundFile) {
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

      $MediaPlayer.Play()

      Start-Sleep -Seconds $Duration
      `, { shell: 'powershell' }
    )

    return {
      stop() {
        mediaPlayerProcess.kill()
      },
    }
  }
}

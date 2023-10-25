import { exec } from 'child_process';
import path from 'path';

export class WindowsSoundPlayer {

  play(soundFile) {
    const mediaPlayerProcess = exec(`
      $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
      $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri("${path.resolve(soundFile)}")
      $MediaPlayer.Play()

      do
      {
        $Duration = $MediaPlayer.NaturalDuration.TotalSeconds
      }
      while ($Duration -eq 0)

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

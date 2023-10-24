import { exec } from 'child_process';
import path from 'path';

// let i = 0
export class WindowsSoundPlayer {

  play(soundFile) {
    // ++i
    // console.log(`$MediaPlayer`)
    exec(`
      $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New();
      $MediaPlayer.Source = [Windows.Media.Core.MediaSource]::CreateFromUri('${path.resolve(soundFile)}');
      $MediaPlayer.MediaOpened += {
        # $MediaPlayer.Play()
        Start-Sleep -s ($MediaPlayer.NaturalDuration.TotalSeconds + 1);
      }
      $MediaPlayer.Play();
      # $MediaPlayer.Play();
      # Start-Sleep -s 1
      # $SleepTime = $MediaPlayer.NaturalDuration;
      # $SleepTime > T:\\sleep-time.txt
      # Start-Sleep -s $SleepTime;
      `, { shell: 'powershell' }
    )
  }
}

import { exec } from 'child_process';
import path from 'path';
import readline from 'readline';

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

      "ready"

      $Continue = $true
      do
      {
        switch ([Console]::ReadLine())
        {
          'start'
          {
            if ($MediaPlayer.PlaybackSession.PlaybackState -eq 'Playing')
            {
              $MediaPlayer.Pause()
              $MediaPlayer.Position = 0
              Sleep -Milliseconds 5
            }
            $MediaPlayer.Play()
          }
          'pause' { $MediaPlayer.Pause() }
          'resume' { $MediaPlayer.Play() }
          'stop' { $Continue = false }
        }
      }
      while ($Continue)
      `, { shell: 'powershell' }
    )

    const subprocessOutput = readline.createInterface({
      input: mediaPlayerProcess.stdout,
    });

    return new Promise(resolve => {
      subprocessOutput.on('line', lineRead => {
        // log({ lineRead })
        if (lineRead === 'ready') {
          resolve({
            start() {
              mediaPlayerProcess.stdin.write('start\n')
            },

            pause() {
              mediaPlayerProcess.stdin.write('pause\n')
            },

            resume() {
              mediaPlayerProcess.stdin.write('resume\n')
            },

            stop() {
              // TODO Decide between these implementation options

              mediaPlayerProcess.stdin.write('stop\n')
              // mediaPlayerProcess.kill()
            },
          })
        }
      })
      subprocessOutput.on('close', () => {
        subprocessOutput.removeAllListeners()
      })
    })
  }
}

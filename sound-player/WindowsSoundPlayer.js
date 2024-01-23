import { exec } from 'child_process';
import path from 'path';
import readline from 'readline';

const FORBIDDEN_CHARACTERS = /["`\n]/

export class WindowsSoundPlayer {

  async load(filePath, { maxInstances } = {}) {
    maxInstances = Number(maxInstances) || 1
    const resolvedPath = path.resolve(filePath)

    if (FORBIDDEN_CHARACTERS.test(resolvedPath)) {
      throw Error('Invalid sound file path: ' + resolvedPath)
    }

    const mediaPlayerProcess = exec(`
      $FilePath = "${resolvedPath}"
      $players = New-Object object[] ${maxInstances}
      foreach ($i in 0..($players.count - 1)) {
        $players[$i] = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
        $players[$i].Source = [Windows.Media.Core.MediaSource]::CreateFromUri($FilePath)
      }
      # $MediaPlayer = [Windows.Media.Playback.MediaPlayer, Windows.Media, ContentType = WindowsRuntime]::New()
      # $MediaPlayer = New-Object Windows.Media.Playback.MediaPlayer
      # $MediaPlayer = $players[0]

      do
      {
        $Duration = $players[0].NaturalDuration.TotalSeconds
      }
      while ($Duration -eq 0)

      'ready'

      $currentIndex = -1

      $Continue = $true
      do
      {
        switch ([Console]::ReadLine())
        {
          'start'
          {
            $currentIndex = ($currentIndex + 1) % $players.count
            $players[$currentIndex].Play()
          }
          'pause' { $players[$currentIndex].Pause() }
          'resume' { $players[$currentIndex].Play() }
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

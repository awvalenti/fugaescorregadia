import { exec } from 'child_process';
import { log } from 'console';
import { readFile } from 'fs/promises';
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

    const code = String(await readFile('./sound-player/WindowsSoundPlayer.ps1'))
      .replace('file-path-goes-here', resolvedPath)
      .replace('max-instances-goes-here', maxInstances)

    const mediaPlayerProcess = exec(code, { shell: 'powershell' })

    const subprocessOutput = readline.createInterface({
      input: mediaPlayerProcess.stdout,
    });

    return new Promise(async (resolve, reject) => {
      try {
        for await (const lineRead of subprocessOutput) {
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
                mediaPlayerProcess.kill()
              },
            })
          }
        }

      } catch (e) {
        reject(e)

      } finally {
        subprocessOutput.removeAllListeners()
      }
    })
  }
}

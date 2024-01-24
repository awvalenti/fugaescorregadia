import { exec, spawn } from 'child_process';
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

    const mediaPlayerProcess = spawn('powershell', [
      '-ExecutionPolicy',
      'bypass',
      './sound-player/WindowsSoundPlayer.ps1',
      `"${resolvedPath}"`,
      maxInstances,
    ])

    const subprocessOutput = readline.createInterface({
      input: mediaPlayerProcess.stdout,
    });

    // TODO
    const subprocessErrors = readline.createInterface({
      input: mediaPlayerProcess.stderr,
      output: process.stderr
    });
    subprocessErrors.on('close', () => {
      subprocessOutput.removeAllListeners()
    })

    return new Promise(async (resolve, reject) => {
      try {
        const iterator = subprocessOutput[Symbol.asyncIterator]()
        let next = await iterator.next()
        let lineRead = next.value
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

      } catch (e) {
        reject(e)

      } finally {
        subprocessOutput.removeAllListeners()
      }
    })
  }
}

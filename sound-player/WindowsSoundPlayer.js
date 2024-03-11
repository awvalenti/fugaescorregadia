import { exec, spawn } from 'child_process';
import { log } from 'console';
import { readFile } from 'fs/promises';
import path from 'path';
import readline from 'readline';

const FORBIDDEN_CHARACTERS = /["`\n]/

export class WindowsSoundPlayer {

  async load(filePath, options = {}) {
    const defaultOptions = {
      maxInstances: 1,
      loop: false,
    }
    const resolvedPath = path.resolve(filePath)

    if (FORBIDDEN_CHARACTERS.test(resolvedPath)) {
      throw Error('Invalid sound file path: ' + resolvedPath)
    }

    const mediaPlayerProcess = spawn('powershell', [
      '-ExecutionPolicy',
      'bypass',
      './sound-player/WindowsSoundPlayer.ps1',
      `"${resolvedPath}"`,
      options.maxInstances ?? defaultOptions.maxInstances,
      Number(options.loop ?? defaultOptions.loop),
    ])

    const subprocessStdout = readline.createInterface({
      input: mediaPlayerProcess.stdout,
    });

    // // TODO
    // const subprocessStderr = readline.createInterface({
    //   input: mediaPlayerProcess.stderr,
    //   // output: process.stderr
    // });
    // subprocessStderr.on('close', () => {
    //   subprocessStdout.removeAllListeners()
    // })

    // FIXME Get OS encoding
    // mediaPlayerProcess.stderr.setEncoding('utf8')


    return Promise.race([
      new Promise((_, reject) => {
        let errorOutput = ''
        mediaPlayerProcess.stderr.on('data', chunk => {
          errorOutput += chunk
        })
        // exit or close, which one is better?
        // mediaPlayerProcess.on('close', errorCode => {
        mediaPlayerProcess.on('exit', errorCode => {
          // TODO In the future, log these details
          if (errorCode) reject(`Subprocess ended with code ${errorCode}. Details:\n${errorOutput}`)
        })
        // mediaPlayerProcess.stderr.on('end', () => {
        //   mediaPlayerProcess.
        //   reject('my error')
        // })
        setTimeout(() => {
          reject('Timed out reading sound\n' + errorOutput)
        }, 20000)
      }),
      new Promise(async (resolve, reject) => {
        try {
          const iterator = subprocessStdout[Symbol.asyncIterator]()
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
          reject(new Exception(`Error loading ${filePath}. Couldn't read subprocess stdout.`, { cause: e }))

        } finally {
          subprocessStdout.removeAllListeners()
        }
      })])
  }
}

import { detectPlatform } from './detectPlatform.js'
import { LinuxSoundPlayer } from './LinuxSoundPlayer.js'
import { MacSoundPlayer } from './MacSoundPlayer.js'
import { WindowsSoundPlayer } from './WindowsSoundPlayer.js'

export class SoundPlayer {

  static async create() {
    const ret = new SoundPlayer()
    const platform = detectPlatform()
    switch (platform) {
      case 'LINUX':
        ret._innerPlayer = await LinuxSoundPlayer.create()
        break
      case 'WINDOWS':
        ret._innerPlayer = new WindowsSoundPlayer()
        break
      case 'MAC':
        ret._innerPlayer = new MacSoundPlayer()
        break
      default:
        throw Error(platform)
    }
    return ret
  }

  async load(filePath, options = {}) {
    const defaultOptions = {
      maxInstances: 1,
      loop: false,
    }
    // TODO Refactor
    if (options.maxInstances == null) options.maxInstances = defaultOptions.maxInstances
    if (options.loop == null) options.loop = defaultOptions.loop

    return await this._innerPlayer.load(filePath, options)
  }

  free() {
    this._innerPlayer.free()
  }

}

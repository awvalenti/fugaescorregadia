import l01 from '../../../levels/01.level'
import l02 from '../../../levels/02.level'

const levels = [l01, l02]

export default class LevelFileReader {
  read(id: number): string {
    if (id < 1 || id > levels.length) throw Error(`Invalid id: ${id}`)
    return levels[id - 1]
  }
}

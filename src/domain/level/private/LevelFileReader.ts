import level01 from '../../../game-design/levels/01.level'
import level02 from '../../../game-design/levels/02.level'

const MIN_LEVEL = 1, MAX_LEVEL = 2

export default class LevelFileReader {
  read(id: number): string {
    if (id < MIN_LEVEL || id > MAX_LEVEL) throw Error(`Invalid id: ${id}`)
    return id === 1 ? level01 : level02
  }
}

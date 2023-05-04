import level01 from '../../../levels/01.level'
import level02 from '../../../levels/02.level'
import level03 from '../../../levels/03.level'

const MIN_LEVEL = 1, MAX_LEVEL = 3

export default class LevelFileReader {
  read(id: number): string {
    if (id < MIN_LEVEL || id > MAX_LEVEL) throw Error(`Invalid id: ${id}`)
    return [level01, level02, level03][id - 1]
  }
}

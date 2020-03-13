import level00 from '../../game-design/levels/00.level'

export default class LevelReader {
  read(id: string): string {
    if (Number(id) > 0) throw Error(`Invalid id: ${id}`)
    return level00
  }
}

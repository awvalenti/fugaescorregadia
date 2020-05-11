import Level from './Level'

export default class BoundsChecker {

  inbounds(level: Level, row: number, col: number): boolean {
    return row >= 0 && row < level.rowCount && col >= 0 && col < level.colCount
  }

}

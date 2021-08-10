import { GOAL, PLAYER, TileMatrix } from '../../TileId'

export default class LevelValidator {
  private _consistentColsCount(m: TileMatrix) {
    return m.length <= 1 || m.every(row => row.length === m[0].length)
  }

  private _correctAmounts(matrix: TileMatrix) {
    let playerCount = 0, goalCount = 0

    matrix.forEach(rowData => {
      rowData.forEach(tile => {
        if (tile === PLAYER) ++playerCount
        else if (tile === GOAL) ++goalCount
      })
    })

    return playerCount === 1 && goalCount === 1
  }

  run(matrix: TileMatrix): boolean {
    return this._consistentColsCount(matrix) && this._correctAmounts(matrix)
  }
}

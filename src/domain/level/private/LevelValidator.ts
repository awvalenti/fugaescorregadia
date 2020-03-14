import TileId, { GOAL, PLAYER } from '../../TileId'

const _consistentColsCount = (m: TileId[][]) =>
  m.length <= 1 || m.every(row => row.length === m[0].length)

const _correctAmounts = (matrix: TileId[][]) => {
  let playerCount = 0, goalCount = 0

  matrix.forEach(rowData => {
    rowData.forEach(tile => {
      if (tile === PLAYER) ++playerCount
      else if (tile === GOAL) ++goalCount
    })
  })

  return playerCount === 1 && goalCount === 1
}

export default class LevelValidator {
  run(matrix: TileId[][]): boolean {
    return _consistentColsCount(matrix) && _correctAmounts(matrix)
  }
}

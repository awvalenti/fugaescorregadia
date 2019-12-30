import TileId, { PLAYER, GOAL } from './TileId'

export default class LevelValidator {

  run(matrix: TileId[][]) {
    let playerCount = 0, goalCount = 0

    matrix.forEach(rowData => {
      rowData.forEach(tile => {
        if (tile === PLAYER) ++playerCount
        else if (tile === GOAL) ++goalCount
      })
    })

    return playerCount === 1 && goalCount === 1
  }

}

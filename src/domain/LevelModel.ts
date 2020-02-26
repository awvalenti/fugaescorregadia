import TileId, { PLAYER, EMPTY } from './TileId'
import Position from './Position'

export default class LevelModel {

  private matrix: TileId[][]

  constructor(matrix: TileId[][]) {
    this.matrix = matrix
  }

  get playerPos(): Position {
    for (let row = 0; row < this.matrix.length; ++row) {
      for (let col = 0; col < this.matrix[row].length; ++col) {
        if (this.matrix[row][col] === PLAYER) return { row, col }
      }
    }

    throw new Error('NO_PLAYER')
  }

  get background(): TileId[][] {
    return this.matrix.map(rowData =>
      rowData.map(tile => tile === PLAYER ? EMPTY : tile)
    )
  }

}

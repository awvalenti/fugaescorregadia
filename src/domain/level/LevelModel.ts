import Position from '../Position'
import TileId, { EMPTY, PLAYER } from '../TileId'
import { NO_PLAYER } from './Error'

export default class LevelModel {

  private _matrix: TileId[][]

  constructor(matrix: TileId[][]) {
    this._matrix = matrix
  }

  get playerPos(): Position {
    for (let row = 0; row < this._matrix.length; ++row) {
      for (let col = 0; col < this._matrix[row].length; ++col) {
        if (this._matrix[row][col] === PLAYER) return { row, col }
      }
    }

    throw NO_PLAYER
  }

  get background(): TileId[][] {
    return this._matrix.map(rowData =>
      rowData.map(tile => tile === PLAYER ? EMPTY : tile)
    )
  }

}

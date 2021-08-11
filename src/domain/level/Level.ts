import Position from '../Position'
import { EMPTY, PLAYER, TileMatrix } from '../TileId'
import { NO_PLAYER } from './private/Error'

export default class Level {

  readonly background: TileMatrix
  readonly playerPos: Position

  private readonly _matrix: TileMatrix

  constructor(matrix: TileMatrix) {
    this._matrix = matrix
    this.background = matrix.map(rowData =>
      rowData.map(tile => tile === PLAYER ? EMPTY : tile))
    this.playerPos = this._findPlayerPos()
  }

  get rowCount(): number {
    return this._matrix.length
  }

  get colCount(): number {
    return this._matrix[0].length
  }

  private _findPlayerPos(): Position {
    for (let row = 0; row < this._matrix.length; ++row) {
      for (let col = 0; col < this._matrix[row].length; ++col) {
        if (this._matrix[row][col] === PLAYER) return { row, col }
      }
    }

    throw NO_PLAYER
  }

}

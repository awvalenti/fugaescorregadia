import Position from '../Position'
import TileId, { EMPTY, PLAYER } from '../TileId'
import { NO_PLAYER } from './private/Error'

export default class Level {

  private _matrix: TileId[][]
  private _background: TileId[][]
  private _playerPos: Position

  constructor(matrix: TileId[][]) {
    this._matrix = matrix
    this._background = matrix.map(rowData =>
      rowData.map(tile => tile === PLAYER ? EMPTY : tile))
    this._playerPos = this._findPlayerPos()
  }

  get rowCount(): number {
    return this._matrix.length
  }

  get colCount(): number {
    return this._matrix[0].length
  }

  get background(): TileId[][] {
    return this._background
  }

  get playerPos(): Position {
    return this._playerPos
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

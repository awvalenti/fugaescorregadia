import Position from '../Position'
import TileId, { EMPTY, PLAYER, TileMatrix } from '../TileId'
import { NO_PLAYER } from './private/Error'

export default class Level {

  readonly id: number
  readonly background: TileMatrix
  readonly playerPos: Position

  private readonly _matrix: TileMatrix

  constructor(id: number, matrix: TileMatrix) {
    this.id = id
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

  get(p: Position): TileId {
    return this.background[p.row][p.col]
  }

  private _findPlayerPos(): Position {
    for (let row = 0; row < this._matrix.length; ++row) {
      for (let col = 0; col < this._matrix[row].length; ++col) {
        if (this._matrix[row][col] === PLAYER) return new Position(row, col)
      }
    }

    throw NO_PLAYER
  }

}

import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import TileId, { OBSTACLE } from './TileId'

const inbounds = (matrix: TileId[][], row: number, col: number) =>
  row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length

const walk = (curPos: Position, background: TileId[][], dir: Position): Position => {
  const newPos = { row: curPos.row + dir.row, col: curPos.col + dir.col }
  return !inbounds(background, newPos.row, newPos.col) || background[newPos.row][newPos.col] === OBSTACLE
    ? curPos
    : walk(newPos, background, dir)
}

export default class GameState {
  private _level: Level

  constructor(level: Level) {
    this._level = level
  }

  movePlayer(direction: Direction): Position {
    const { playerPos, background } = this._level

    return walk(playerPos, background, direction)
  }
}

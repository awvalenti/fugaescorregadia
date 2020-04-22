import LevelModel from './level/LevelModel'
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

const ble = {
  LEFT: { row: 0, col: -1 },
  UP: { row: -1, col: 0 },
  RIGHT: { row: 0, col: +1 },
  DOWN: { row: +1, col: 0 },
}

export default class GameState {
  static newPos(level: LevelModel, direction: keyof typeof ble): Position {
    const { playerPos, background } = level

    return walk(playerPos, background, ble[direction])
  }
}

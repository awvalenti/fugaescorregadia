import Direction from './Direction'
import Level from './level/Level'
import Position from './Position'
import { OBSTACLE } from './TileId'

export default class Mover {

  move(level: Level, playerPos: Position, direction: Direction): Position {
    const newPos = {
      row: playerPos.row + direction.row,
      col: playerPos.col + direction.col,
    }

    return !level.inbounds(newPos) ||
      level.background[newPos.row][newPos.col] === OBSTACLE
      ? playerPos
      : this.move(level, newPos, direction)
  }

}

import Position from '../../../domain/Position'
import { MoveFinishedListener } from '../../../infra/Controller'

export default function anticipateMoveFinishedIfNecessary(
  moveFinishedListener: MoveFinishedListener,
  prevPos: Position,
  currentPos: Position,
) {
  if (currentPos.row === prevPos.row && currentPos.col === prevPos.col) {
    moveFinishedListener.moveFinished$()
  }
}

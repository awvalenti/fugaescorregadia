import Position from '../../../domain/Position'
import { UpdateFinishedListener } from '../../../infra/Controller'

export default function anticipateUpdateFinishedIfNecessary(
  updateFinishedListener: UpdateFinishedListener,
  prevPos: Position,
  currentPos: Position,
) {
  if (currentPos.row === prevPos.row && currentPos.col === prevPos.col) {
    updateFinishedListener.updateFinished$()
  }
}

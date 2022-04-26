import Position from '../../../domain/Position'
import { UpdateFinishedListener } from '../../../infra/Controller'

export default function anticipateUpdateFinishedIfNecessary(
  updateFinishedListener: UpdateFinishedListener,
  previousPos: Position,
  currentPos: Position,
) {
  if (currentPos.equals(previousPos)) {
    setTimeout(() => {
      updateFinishedListener.updateFinished$()
    }, 0)
  }
}

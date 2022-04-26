import Position from '../../../domain/Position'
import { UpdateFinishedListener } from '../../../infra/Controller'

export default function anticipateUpdateFinishedIfNecessary(
  updateFinishedListener: UpdateFinishedListener,
  previousPos: Position,
  currentPos: Position,
) {
  // console.log(JSON.stringify({ currentPos, previousPos }))
  // debugger

  if (currentPos.equals(previousPos)) {
    // eslint-disable-next-line no-debugger
    // debuggers
    console.log(15)
    // setTimeout(() => {
    updateFinishedListener.updateFinished$()
    // }, 0)
  }
}

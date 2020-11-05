import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import { MoveFinishedListener } from '../infra/Controller'
import usePrevious from './hooks/usePrevious'
import Tile from './Tile'

const PlayerTile: React.FC<{

  currentPos: Position
  moveFinishedListener: MoveFinishedListener

}> = ({
  currentPos,
  moveFinishedListener,
}) => {
  const
    prevPos = usePrevious(currentPos),
    { row, col } = currentPos,
    animationStepDuration = 40

  if (row === prevPos.row && col === prevPos.col && moveFinishedListener) {
    moveFinishedListener.moveFinished$()
  }

  return <Tile
    tileId={PLAYER}
    style={{
      transform: `translate(${col * 100}%, ${row * 100}%)`,
      transitionDuration: `${(Math.abs(prevPos.row - row) +
        Math.abs(prevPos.col - col)) * animationStepDuration}ms`,
    }}
    onTransitionEnd={moveFinishedListener.moveFinished$.bind(
      moveFinishedListener)}
  />
}

export default PlayerTile

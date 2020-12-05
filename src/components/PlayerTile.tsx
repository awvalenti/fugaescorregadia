import * as React from 'react'
import { useContext } from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import AppContext from './App/AppContext'
import usePrevious from './hooks/usePrevious'
import Tile from './Tile'

const PlayerTile: React.FC<{

  currentPos: Position

}> = ({
  currentPos,
}) => {
  const
    prevPos = usePrevious(currentPos),
    { row, col } = currentPos,
    animationStepDuration = 40,
    { moveFinishedListener } = useContext(AppContext)

  if (row === prevPos.row && col === prevPos.col) {
    moveFinishedListener.moveFinished$()
  }

  return <Tile
    tileId={PLAYER}
    style={{
      transform: `translate(${col * 100}%, ${row * 100}%)`,
      transitionDuration: `${(Math.abs(prevPos.row - row) +
        Math.abs(prevPos.col - col)) * animationStepDuration}ms`,
    }}
    onTransitionEnd={moveFinishedListener.moveFinished$}
  />
}

export default PlayerTile

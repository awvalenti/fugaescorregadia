import * as React from 'react'
import { useContext } from 'react'
import Position from '../../domain/Position'
import { PLAYER } from '../../domain/TileId'
import AppContext from '../App/AppContext'
import usePrevious from '../hooks/usePrevious'
import TileView from '../TileView'
import anticipateUpdateFinishedIfNecessary from './private/anticipateUpdateFinishedIfNecessary'

const PlayerTileView: React.FC<{

  currentPos: Position

}> = ({
  currentPos,
}) => {
  const
    prevPos = usePrevious(currentPos),
    { row, col } = currentPos,
    animationStepDuration = 40,
    { updateFinishedListener } = useContext(AppContext)

  anticipateUpdateFinishedIfNecessary(updateFinishedListener, prevPos, currentPos)

  return <TileView
    tileId={PLAYER}
    style={{
      transform: `translate(${col * 100}%, ${row * 100}%)`,
      transitionDuration: `${(Math.abs(prevPos.row - row) +
        Math.abs(prevPos.col - col)) * animationStepDuration}ms`,
    }}
    onTransitionEnd={updateFinishedListener.updateFinished$}
  />
}

export default PlayerTileView
/* eslint-disable @typescript-eslint/indent */
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
  // still: boolean

}> = ({
  currentPos,
  // still,
}) => {
    const
      prevPos = usePrevious(currentPos),
      { row, col } = currentPos,
      animationStepDuration = 40,
      { updateFinishedListener } = useContext(AppContext)

    // console.log('oi')
    // console.log('current\n', currentPos, '\n\nprev\n', prevPos, '\n\n', currentPos.equals(prevPos))

    anticipateUpdateFinishedIfNecessary(updateFinishedListener, prevPos, currentPos)

    return <TileView
      tileId={PLAYER}
      style={{
        transform: `translate(${col * 100}%, ${row * 100}%)`,
        // still ? '1ms' :
        transitionDuration: `${(Math.abs(prevPos.row - row) +
          Math.abs(prevPos.col - col)) * animationStepDuration}ms`,
      }}
      onTransitionEnd={updateFinishedListener.updateFinished$}
    />
  }

export default PlayerTileView

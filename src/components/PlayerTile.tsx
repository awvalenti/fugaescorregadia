import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
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
    animationStepDuration = 40

  return <Tile
    tileId={PLAYER}
    style={{
      transform: `translate(${col * 100}%, ${row * 100}%)`,
      transitionDuration: `${(Math.abs(prevPos.row - row) +
        Math.abs(prevPos.col - col)) * animationStepDuration}ms`,
    }}
  />
}

export default PlayerTile

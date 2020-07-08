import * as React from 'react'
import { useRef } from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import Tile from './Tile'

const ANIMATION_STEP_DURATION = 40

const PlayerTile: React.FC<{

  currentPos: Position

}> = ({
  currentPos,
}) => {
  const previousPosRef = useRef(currentPos)
  const previousPos = previousPosRef.current
  previousPosRef.current = currentPos
  const { row, col } = currentPos

  return <Tile
    tileId={PLAYER}
    style={{
      transform: `translate(${col * 100}%, ${row * 100}%)`,
      transitionDuration: `${(Math.abs(previousPos.row - row) +
        Math.abs(previousPos.col - col)) * ANIMATION_STEP_DURATION}ms`,
    }}
  />
}

export default PlayerTile

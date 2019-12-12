import * as React from 'react'
import Position from '../domain/Position'

const SpriteLayer: React.FC<{

  playerPos: Position

}> = ({ playerPos: { row, col } }) =>
  <div>
    <div
      className="PLAYER"
      style={{ transform: `translate(${col * 100}%, ${row * 100}%)` }}
    >
      PLAYER
    </div>
  </div>

export default SpriteLayer

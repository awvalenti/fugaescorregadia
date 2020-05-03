import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import Tile from './Tile'

const SpriteLayer: React.FC<{

  playerPos: Position

}> = ({ playerPos: { row, col } }) =>
  <div>
    <Tile
      tileId={PLAYER}
      style={{ transform: `translate(${col * 100}%, ${row * 100}%)` }}
    />
  </div>

export default SpriteLayer

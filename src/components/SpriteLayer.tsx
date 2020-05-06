import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import nameof from '../my-libs/nameof'
import './SpriteLayer.sass'
import Tile from './Tile'

const SpriteLayer: React.FC<{

  playerPos: Position

}> = ({ playerPos: { row, col } }) =>
  <div className={nameof(SpriteLayer)}>
    <Tile
      tileId={PLAYER}
      style={{ transform: `translate(${col * 100}%, ${row * 100}%)` }}
    />
  </div>

export default SpriteLayer

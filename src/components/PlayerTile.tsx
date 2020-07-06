import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import Tile from './Tile'

const PlayerTile: React.FC<{

  playerPos: Position

}> = ({ playerPos: { row, col } }) => <Tile
  tileId={PLAYER}
  style={{ transform: `translate(${col * 100}%, ${row * 100}%)` }}
/>

export default PlayerTile

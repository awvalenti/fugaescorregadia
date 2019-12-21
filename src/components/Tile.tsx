import * as React from 'react'
import TileId from '../domain/TileId'

export type Type = React.FC<{

  tileId: TileId

}>

const Tile: Type = ({ tileId }) =>
  <div className={`TILE ${tileId}`} />

export default Tile

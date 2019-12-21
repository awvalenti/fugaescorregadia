import * as React from 'react'
import TileId from '../domain/TileId'

const Tile: React.FC<{

  tileId: TileId

}> = ({ tileId }) =>
  <div className={`TILE ${tileId}`} />

export default Tile

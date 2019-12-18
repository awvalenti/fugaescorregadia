import * as React from 'react'
import TileType from '../domain/TileType'

const Tile: React.FC<{

  type: TileType

}> = ({ type }) =>
  <div className={`TILE ${type}`} />

export default Tile

import * as React from 'react'
import TileId from '../domain/TileId'
import nameof from '../my-libs/nameof'
import './Tile.sass'

const Tile: React.FC<{

  tileId: TileId
  style?: React.CSSProperties

}> = ({ tileId, style }) =>
  <div className={`${nameof(Tile)} ${tileId}`} style={style} />

export default Tile

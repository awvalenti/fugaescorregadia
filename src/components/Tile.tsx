import * as React from 'react'
import TileId from '../domain/TileId'
import nameof from '../my-libs/nameof'
import './Tile.sass'

const Tile: React.FC<{

  tileId: TileId
  style?: React.CSSProperties
  onTransitionEnd?: () => void

}> = ({
  tileId,
  style,
  onTransitionEnd,
}) =>
  <div
    className={`${nameof(Tile)} ${tileId}`}
    style={style}
    onTransitionEnd={onTransitionEnd}
  />

export default Tile

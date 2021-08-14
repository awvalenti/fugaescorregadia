import * as React from 'react'
import TileId from '../domain/TileId'
import nameof from '../my-libs/nameof'
import './TileView.sass'

const TileView: React.FC<{

  tileId: TileId
  style?: React.CSSProperties
  onTransitionEnd?: () => void

}> = ({
  tileId,
  style,
  onTransitionEnd,
}) =>
  <div
    className={`${nameof(TileView)} ${tileId}`}
    style={style}
    onTransitionEnd={onTransitionEnd}
  />

export default TileView

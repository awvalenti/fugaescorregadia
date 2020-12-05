import * as React from 'react'
import { useContext } from 'react'
import TileId from '../domain/TileId'
import nameof from '../my-libs/nameof'
import AppContext from './App/AppContext'
import './Tile.sass'

const Tile: React.FC<{

  tileId: TileId
  style?: React.CSSProperties

}> = ({
  tileId,
  style,
}) => {
  const { moveFinishedListener } = useContext(AppContext)
  return <div
    className={`${nameof(Tile)} ${tileId}`}
    style={style}
    onTransitionEnd={moveFinishedListener.moveFinished$.bind(
      moveFinishedListener)}
  />
}

export default Tile

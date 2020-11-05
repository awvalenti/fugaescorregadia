import * as React from 'react'
import Position from '../domain/Position'
import nameof from '../my-libs/nameof'
import PlayerTile from './PlayerTile'
import './SpriteLayer.sass'

const SpriteLayer: React.FC<{
  ote: () => void

  rowCount: number
  colCount: number
  playerPos: Position

}> = ({
  rowCount,
  colCount,
  playerPos,
  ote,
}) =>
  <div className={nameof(SpriteLayer)} style={{
    width: `${100 / colCount}%`,
    height: `${100 / rowCount}%`,
  }}>
    <PlayerTile currentPos={playerPos} ote={ote}/>
  </div>

export default SpriteLayer

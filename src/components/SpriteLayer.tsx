import * as React from 'react'
import Position from '../domain/Position'
import nameof from '../my-libs/nameof'
import PlayerTileView from './PlayerTileView/PlayerTileView'
import './SpriteLayer.sass'

const SpriteLayer: React.FC<{

  rowCount: number
  colCount: number
  playerPos: Position
  // still: boolean

}> = ({
  rowCount,
  colCount,
  playerPos,
  // still,
}) =>
  <div className={nameof(SpriteLayer)} style={{
    width: `${100 / colCount}%`,
    height: `${100 / rowCount}%`,
  }}>
    <PlayerTileView currentPos={playerPos}
      // still={still}
    />
  </div>

export default SpriteLayer

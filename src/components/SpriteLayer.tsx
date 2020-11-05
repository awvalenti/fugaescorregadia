import * as React from 'react'
import Position from '../domain/Position'
import { MoveFinishedListener } from '../infra/Controller'
import nameof from '../my-libs/nameof'
import PlayerTile from './PlayerTile'
import './SpriteLayer.sass'

const SpriteLayer: React.FC<{

  rowCount: number
  colCount: number
  playerPos: Position
  moveFinishedListener: MoveFinishedListener

}> = ({
  rowCount,
  colCount,
  playerPos,
  moveFinishedListener,
}) =>
  <div className={nameof(SpriteLayer)} style={{
    width: `${100 / colCount}%`,
    height: `${100 / rowCount}%`,
  }}>
    <PlayerTile currentPos={playerPos} moveFinishedListener={moveFinishedListener}/>
  </div>

export default SpriteLayer

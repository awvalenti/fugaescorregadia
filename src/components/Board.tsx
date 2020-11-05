import * as React from 'react'
import { useMemo } from 'react'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import { MoveFinishedListener } from '../infra/Controller'
import nameof from '../my-libs/nameof'
import BackgroundLayer from './BackgroundLayer'
import './Board.sass'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{

  level: Level
  playerPos: Position
  moveFinishedListener: MoveFinishedListener

}> = ({
  level,
  playerPos,
  moveFinishedListener,
}) =>
  <div className={nameof(Board)}>
    {useMemo(() => <BackgroundLayer matrix={level.background} />, [level])}
    <SpriteLayer
      rowCount={level.rowCount}
      colCount={level.colCount}
      playerPos={playerPos}
      moveFinishedListener={moveFinishedListener}
    />
  </div>

export default Board

import * as React from 'react'
import { useMemo } from 'react'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import nameof from '../my-libs/nameof'
import BackgroundLayer from './BackgroundLayer'
import './Board.sass'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{
  ote: () => void

  level: Level
  playerPos: Position

}> = ({ level, playerPos, ote }) =>
  <div className={nameof(Board)}>
    {useMemo(() => <BackgroundLayer matrix={level.background} />, [level])}
    <SpriteLayer
      rowCount={level.rowCount}
      colCount={level.colCount}
      playerPos={playerPos}
      ote={ote}
    />
  </div>

export default Board

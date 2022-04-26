import * as React from 'react'
import Level from '../domain/level/Level'
import Position from '../domain/Position'
import nameof from '../my-libs/nameof'
import BackgroundLayer from './BackgroundLayer'
import './Board.sass'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{

  level: Level
  playerPos: Position
  // still: boolean

}> = ({
  level,
  playerPos,
  // still,
}) =>
  <div className={nameof(Board)}>
    <BackgroundLayer matrix={level.background} />
    <SpriteLayer
      rowCount={level.rowCount}
      colCount={level.colCount}
      playerPos={playerPos}
      // // still={still}
    />
  </div>

export default Board

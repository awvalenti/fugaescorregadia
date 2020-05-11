import * as React from 'react'
import Level from '../domain/level/Level'
import nameof from '../my-libs/nameof'
import BackgroundLayer from './BackgroundLayer'
import './Board.sass'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{

  level: Level

}> = ({ level }) =>
  <div className={nameof(Board)}>
    <BackgroundLayer matrix={level.background} />
    <SpriteLayer
      rowCount={level.rowCount}
      colCount={level.colCount}
      playerPos={level.playerPos}
    />
  </div>

export default Board

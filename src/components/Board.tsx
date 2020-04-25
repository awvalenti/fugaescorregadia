import * as React from 'react'
import Level from '../domain/level/Level'
import BackgroundLayer from './BackgroundLayer'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{

  level: Level

}> = ({ level }) =>
  <div>
    <BackgroundLayer matrix={level.background} />
    <SpriteLayer playerPos={level.playerPos} />
  </div>

export default Board

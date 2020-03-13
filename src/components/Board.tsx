import * as React from 'react'
import LevelModel from '../domain/level/LevelModel'
import BackgroundLayer from './BackgroundLayer'
import SpriteLayer from './SpriteLayer'

const Board: React.FC<{

  level: LevelModel

}> = ({ level }) =>
  <div>
    <BackgroundLayer matrix={level.background} />
    <SpriteLayer playerPos={level.playerPos} />
  </div>

export default Board

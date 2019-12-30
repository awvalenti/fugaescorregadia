import * as React from 'react'
import BackgroundLayer from './BackgroundLayer'
import SpriteLayer from './SpriteLayer'
import LevelModel from '../domain/LevelModel'

const Board: React.FC<{

  level: LevelModel

}> = ({ level }) =>
  <div>
    <BackgroundLayer matrix={level.background} />
    <SpriteLayer playerPos={level.playerPos} />
  </div>

export default Board

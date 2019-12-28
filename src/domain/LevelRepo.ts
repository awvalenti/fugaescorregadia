import TileId from './TileId'
import LevelModel from './LevelModel'

const { EMPTY, OBSTACLE } = TileId

export default class LevelRepo {

  get() {
    return new LevelModel([
      [OBSTACLE, EMPTY, EMPTY, OBSTACLE],
      [EMPTY,    EMPTY, EMPTY, OBSTACLE],
    ])
  }

}

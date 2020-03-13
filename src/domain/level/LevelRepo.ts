import { EMPTY, OBSTACLE } from '../TileId'
import LevelModel from './LevelModel'

export default class LevelRepo {

  get() {
    return new LevelModel([
      [OBSTACLE, EMPTY, EMPTY, OBSTACLE],
      [EMPTY, EMPTY, EMPTY, OBSTACLE],
    ])
  }

}

import TileId from "./TileId";

export default class LevelModel {

  private matrix: TileId[][]

  constructor(matrix: TileId[][]) {
    this.matrix = matrix
  }

}

import TileId, { PLAYER } from "./TileId";

export default class LevelModel {

  private matrix: TileId[][]

  constructor(matrix: TileId[][]) {
    this.matrix = matrix
  }

  get playerPos() {
    for (let row = 0; row < this.matrix.length; ++row) {
      for (let col = 0; col < this.matrix[row].length; ++col) {
        if (this.matrix[row][col] === PLAYER) return { row, col }
      }
    }

    return null
  }
}

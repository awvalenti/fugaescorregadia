enum TileId {
  EMPTY = 'EMPTY',
  OBSTACLE = 'OBSTACLE',
  GOAL = 'GOAL',
  PLAYER = 'PLAYER',
}

export const {
  EMPTY,
  OBSTACLE,
  GOAL,
  PLAYER,
} = TileId

export default TileId

export type TileMatrix = readonly TileId[][]


export const ILLEGAL_GAME_STATE = Error('IllegalGameState')

interface Tile {
  stopBefore(): boolean
  stopInside(): boolean
  toString(): string
}

export const EMPTY: Tile = {
  stopBefore() { return false },
  stopInside() { return false },
  toString() { return 'EMPTY' },
}

export const OBSTACLE: Tile = {
  stopBefore() { return true },
  stopInside() { throw ILLEGAL_GAME_STATE },
  toString() { return 'OBSTACLE' },
}

export const GOAL: Tile = {
  stopBefore() { return false },
  stopInside() { return true },
  toString() { return 'GOAL' },
}

export const PLAYER: Tile = {
  stopBefore() { throw ILLEGAL_GAME_STATE },
  stopInside() { throw ILLEGAL_GAME_STATE },
  toString() { return 'PLAYER' },
}

export default Tile

export type TileMatrix = readonly Tile[][]

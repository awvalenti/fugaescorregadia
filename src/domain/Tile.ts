export type Transition =
  | 'KEEP_MOVING'
  | 'STOP_BEFORE'
  | 'ADVANCE_LEVEL'

export const ILLEGAL_GAME_STATE = Error('IllegalGameState')

interface Tile {
  before(): Transition
  during(): Transition
  toString(): string
}

export const EMPTY: Tile = {
  before() { return 'KEEP_MOVING' },
  during() { return 'KEEP_MOVING' },
  toString() { return 'EMPTY' },
}

export const OBSTACLE: Tile = {
  before() { return 'STOP_BEFORE' },
  during() { throw ILLEGAL_GAME_STATE },
  toString() { return 'OBSTACLE' },
}

export const GOAL: Tile = {
  before() { return 'KEEP_MOVING' },
  during() { return 'ADVANCE_LEVEL' },
  toString() { return 'GOAL' },
}

export const PLAYER: Tile = {
  before() { throw ILLEGAL_GAME_STATE },
  during() { throw ILLEGAL_GAME_STATE },
  toString() { return 'PLAYER' },
}

export default Tile

export type TileMatrix = readonly Tile[][]

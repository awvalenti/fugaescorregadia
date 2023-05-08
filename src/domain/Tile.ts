export type Transition =
  | 'KEEP_MOVING'
  | 'STOP'
  | 'ADVANCE_LEVEL'

const ILLEGAL_GAME_STATE = Error('IllegalGameState')

export default interface Tile {
  before(): Transition
  during(): Transition
}

export const EMPTY: Tile = {
  before() { return 'KEEP_MOVING' },
  during() { return 'KEEP_MOVING' },
}

export const OBSTACLE: Tile = {
  before() { return 'STOP' },
  during() { throw ILLEGAL_GAME_STATE },
}

export const GOAL: Tile = {
  before() { return 'KEEP_MOVING' },
  during() { return 'ADVANCE_LEVEL' },
}

export const PLAYER: Tile = {
  before() { throw ILLEGAL_GAME_STATE },
  during() { throw ILLEGAL_GAME_STATE },
}

import { EMPTY, GOAL, OBSTACLE, PLAYER, TileMatrix } from '../../Tile'

export default class LevelParser {
  parse(levelAsString: string): TileMatrix {
    return levelAsString
      .trim()
      .split('\n')
      .map(rowString => rowString
        .split(' ')
        // eslint-disable-next-line complexity
        .map(tileCharCandidate => {
          switch (tileCharCandidate) {
            case '-': return EMPTY
            case 'o': return OBSTACLE
            case 'g': return GOAL
            case 'p': return PLAYER
            default: throw Error(`Invalid character: "${tileCharCandidate}"`)
          }
        })
      )
  }
}

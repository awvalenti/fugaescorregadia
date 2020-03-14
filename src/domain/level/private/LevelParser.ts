import TileId, { EMPTY, GOAL, OBSTACLE, PLAYER } from '../../TileId'

export default class LevelParser {
  parse(levelAsString: string): TileId[][] {
    return levelAsString
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
            default: throw Error(`Invalid character: ${tileCharCandidate}`)
          }
        })
      )
  }
}

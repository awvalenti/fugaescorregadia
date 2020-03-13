import TileId, { EMPTY, OBSTACLE } from '../TileId'

export default class LevelParser {
  convert(levelAsString: string): TileId[][] {
    return levelAsString
      .split('\n')
      .map(rowString => rowString
        .split(' ')
        .map(tileCharCandidate => {
          switch (tileCharCandidate) {
            case '-': return EMPTY
            case 'o': return OBSTACLE
            default: throw Error(`Invalid character: ${tileCharCandidate}`)
          }
        })
      )
  }
}

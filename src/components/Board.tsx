import * as React from 'react'
import TileId from '../domain/TileId'
import Tile from './Tile'

export type Type = React.FC<{

  matrix: TileId[][]

}>

const Board: Type = ({ matrix }) =>
  <div>{matrix.map((rowData, rowIndex) =>
    <div key={rowIndex}>{rowData.map((tileId, colIndex) =>
      <Tile key={colIndex} tileId={tileId} />)}
    </div>)}
  </div>

export default Board

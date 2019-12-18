import * as React from 'react'
import TileType from '../domain/TileType'

const Board: React.FC<{

  matrix: TileType  [][]

}> = ({ matrix }) =>
  <div>{matrix.map((rowData, rowIndex) =>
    <div key={rowIndex}>{rowData.map((element, colIndex) =>
      <div key={colIndex}>{element}</div>)}
    </div>)}
  </div>

export default Board

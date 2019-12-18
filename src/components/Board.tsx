import * as React from 'react'
import TileType from '../domain/TileType'
import Tile from './Tile'

const Board: React.FC<{

  matrix: TileType[][]

}> = ({ matrix }) =>
  <div>{matrix.map((rowData, rowIndex) =>
    <div key={rowIndex}>{rowData.map((element, colIndex) =>
      <Tile key={colIndex} type={element} />)}
    </div>)}
  </div>

export default Board

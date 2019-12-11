import * as React from 'react'

const Board: React.FC<{

  matrix: string[][]

}> = ({ matrix }) =>
  <div>{matrix.map((rowData, rowIndex) =>
    <div key={rowIndex}>{rowData.map((element, colIndex) =>
      <div key={colIndex}>{element}</div>)}
    </div>)}
  </div>

export default Board

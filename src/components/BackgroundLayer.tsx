import * as React from 'react'
import TileId from '../domain/TileId'
import nameof from '../my-libs/nameof'
import './BackgroundLayer.sass'
import Tile from './Tile'

const BackgroundLayer: React.FC<{

  matrix: TileId[][]

}> = ({ matrix }) =>
  <div className={nameof(BackgroundLayer)}>
    {matrix.map((rowData, rowIndex) =>
      <div key={rowIndex} className='row'>
        {rowData.map((tileId, colIndex) =>
          <Tile key={colIndex} tileId={tileId} />
        )}
      </div>
    )}
  </div>

const memo = React.memo(BackgroundLayer)

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
memo.name = nameof(BackgroundLayer)

export default memo

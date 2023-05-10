import * as React from 'react'
import { TileMatrix } from '../domain/Tile'
import nameof from '../my-libs/nameof'
import pureComponent from '../my-libs/pure-component'
import './BackgroundLayer.sass'
import TileView from './TileView'

const BackgroundLayer: React.FC<{

  matrix: TileMatrix

}> = ({ matrix }) =>
    <div className={nameof(BackgroundLayer)}>
      {matrix.map((rowData, rowIndex) =>
        <div key={rowIndex} className='row'>
          {rowData.map((tileId, colIndex) =>
            <TileView key={colIndex} tileId={tileId} />
          )}
        </div>
      )}
    </div>

export default pureComponent(BackgroundLayer)

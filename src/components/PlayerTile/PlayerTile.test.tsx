import * as React from 'react'
import sinon from 'sinon'
import { PLAYER } from '../../domain/TileId'
import { MoveFinishedListener } from '../../infra/Controller'
import { a3, cleanup, expect, Mooca, render } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import AppContext from '../App/AppContext'
import * as usePrevious from '../hooks/usePrevious'
import * as Tile from '../Tile'
import PlayerTile from './PlayerTile'
import * as anticipateMoveFinishedIfNecessary from './private/anticipateMoveFinishedIfNecessary'

a3(PlayerTile, {

  arrange: () => {
    const mooca = new Mooca()
    mooca.stub(Tile, ({ tileId, style }) => <p style={style}>{tileId}</p>)
    mooca.stub(usePrevious, () => ({ row: 1, col: 2 }))
    const anticipateSpy = sinon.spy()
    mooca.stub(anticipateMoveFinishedIfNecessary, anticipateSpy)

    const moveFinishedListener: MoveFinishedListener = {
      moveFinished$: sinon.spy(),
    }

    return {
      mooca,
      component: render(
        <AppContext.Provider value={{ moveFinishedListener } }>
          <PlayerTile currentPos={{ row: 3, col: 6 }} />
        </AppContext.Provider>
      ),
      moveFinishedListener,
      anticipateSpy,
    }
  },

  act: ({ component: { container }, moveFinishedListener, anticipateSpy }) =>
    ({ container, moveFinishedListener, anticipateSpy }),

  assert: {
    [`renders a ${PLAYER} <${nameof(Tile)}>`]:
    ({ container: { firstElementChild } }) => {
      expect(firstElementChild).to.have.property('textContent', 'PLAYER')
    },

    'sets translation to (100% * currentPos.col, 100% * currentPos.row)':
    ({ container: { firstElementChild } }) => {
      expect(firstElementChild).to.have.nested.property(
        'style.transform', 'translate(600%, 300%)')
    },

    'sets animation duration to 40ms * (deltaRow + deltaCol)':
    ({ container: { firstElementChild } }) => {
      expect(firstElementChild).to.have.nested.property(
        'style.transitionDuration', '240ms')
    },

    [`calls ${nameof(anticipateMoveFinishedIfNecessary)}`]:
    ({ moveFinishedListener, anticipateSpy }) => {
      expect(anticipateSpy).to.have.been.called.calledOnceWithExactly(
        moveFinishedListener, { row: 1, col: 2 }, { row: 3, col: 6 })
    },
  },

  after: ({ mooca }: { mooca: Mooca }) => {
    mooca.restore()
    cleanup()
  },

})

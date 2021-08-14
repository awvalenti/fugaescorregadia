import * as React from 'react'
import sinon from 'sinon'
import Position from '../../domain/Position'
import { PLAYER } from '../../domain/TileId'
import { UpdateFinishedListener } from '../../infra/Controller'
import { a3, cleanup, expect, Mooca, render } from '../../my-libs/my-testing-library'
import nameof from '../../my-libs/nameof'
import AppContext from '../App/AppContext'
import * as usePrevious from '../hooks/usePrevious'
import * as TileView from '../TileView'
import PlayerTileView from './PlayerTileView'
import * as anticipateUpdateFinishedIfNecessary from './private/anticipateUpdateFinishedIfNecessary'

a3(PlayerTileView, {

  arrange: () => {
    const mooca = new Mooca()
    mooca.stub(TileView, props => <pre>{JSON.stringify(props, (_, v) =>
      typeof v === 'function' ? v.toString() : v)}</pre>)
    mooca.stub(usePrevious, () => new Position(1, 2))
    const anticipateSpy = sinon.spy()
    mooca.stub(anticipateUpdateFinishedIfNecessary, anticipateSpy)

    const updateFinishedListener: UpdateFinishedListener = {
      updateFinished$: sinon.spy(),
    }
    updateFinishedListener.updateFinished$.toString = () => 'my-updateFinished$'

    return {
      mooca,
      component: render(
        <AppContext.Provider value={{ updateFinishedListener } }>
          <PlayerTileView currentPos={new Position(3, 6)} />
        </AppContext.Provider>
      ),
      updateFinishedListener,
      anticipateSpy,
    }
  },

  act: ({ component, updateFinishedListener, anticipateSpy }) => ({
    updateFinishedListener,
    anticipateSpy,
    props: JSON.parse(component.container.textContent),
  }),

  assert: {
    [`calls ${nameof(anticipateUpdateFinishedIfNecessary)}`]:
    ({ updateFinishedListener, anticipateSpy }) => {
      expect(anticipateSpy).to.have.been.calledOnceWithExactly(
        updateFinishedListener, new Position(1, 2), new Position(3, 6))
    },

    [`renders a <${nameof(TileView)}> containing ${PLAYER}`]:
    ({ props }) => {
      expect(props).to.have.property('tileId', 'PLAYER')
    },

    'sets translation to (100% * currentPos.col, 100% * currentPos.row)':
    ({ props }) => {
      expect(props).to.have.nested.property(
        'style.transform', 'translate(600%, 300%)')
    },

    'sets animation duration to 40ms * (deltaRow + deltaCol)':
    ({ props }) => {
      expect(props).to.have.nested.property('style.transitionDuration', '240ms')
    },

    'sets updateFinishedListener to be called after animation':
    ({ props }) => {
      expect(props).to.have.nested.property('onTransitionEnd', 'my-updateFinished$')
    },

  },

  after: ({ mooca }: { mooca: Mooca }) => {
    mooca.restore()
    cleanup()
  },

})

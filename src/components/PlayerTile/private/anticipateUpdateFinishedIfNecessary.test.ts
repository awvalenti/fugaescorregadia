import { expect } from 'chai'
import sinon from 'sinon'
import Position from '../../../domain/Position'
import Controller, { UpdateFinishedListener } from '../../../infra/Controller'
import { a3, each } from '../../../my-libs/my-testing-library'
import nameof from '../../../my-libs/nameof'
import anticipateUpdateFinishedIfNecessary from './anticipateUpdateFinishedIfNecessary'

const arrange = () => ({
  updateFinishedListener: { updateFinished$: sinon.spy() } as UpdateFinishedListener,
})

const act = (updateFinishedListener: UpdateFinishedListener,
  previousPos: Position, currentPos: Position) => {

  anticipateUpdateFinishedIfNecessary(updateFinishedListener, previousPos,
    currentPos)

  return { updateFinishedListener }
}

a3(anticipateUpdateFinishedIfNecessary, {

  'when positions are equal': {
    arrange,

    act: ({ updateFinishedListener }) => act(updateFinishedListener,
      { row: 1, col: 2 }, { row: 1, col: 2 }),

    assert: {
      [`calls ${nameof<Controller>('updateFinished$')}`]:
      ({ updateFinishedListener: { updateFinished$ } }) => {
        expect(updateFinished$).to.have.been.calledOnceWithExactly()
      },
    },
  },

  ...each(<[Position, Position][]>[
    [{ row: 1, col: 2 }, { row: 1, col: 3 }],
    [{ row: 1, col: 2 }, { row: 3, col: 2 }],
    [{ row: 1, col: 2 }, { row: 3, col: 4 }],
  ], ([previousPos, currentPos]) => ({
    'when positions are different': {
      arrange,

      act: ({ updateFinishedListener }) => act(updateFinishedListener,
        previousPos, currentPos),

      assert: {
        [`does NOT call ${nameof<Controller>('updateFinished$')}`]:
        ({ updateFinishedListener: { updateFinished$ } }) => {
          // eslint-disable-next-line no-unused-expressions
          expect(updateFinished$).not.to.have.been.called
        },
      },
    },
  })),

})

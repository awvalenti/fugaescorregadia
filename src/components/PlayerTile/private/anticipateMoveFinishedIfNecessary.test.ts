import { expect } from 'chai'
import sinon from 'sinon'
import Position from '../../../domain/Position'
import Controller, { MoveFinishedListener } from '../../../infra/Controller'
import { a3, each } from '../../../my-libs/my-testing-library'
import nameof from '../../../my-libs/nameof'
import anticipateMoveFinishedIfNecessary from './anticipateMoveFinishedIfNecessary'

const arrange = () => ({
  moveFinishedListener: { moveFinished$: sinon.spy() } as MoveFinishedListener,
})

const act = (moveFinishedListener: MoveFinishedListener,
  previousPos: Position, currentPos: Position) => {

  anticipateMoveFinishedIfNecessary(moveFinishedListener, previousPos,
    currentPos)

  return { moveFinishedListener }
}

a3(anticipateMoveFinishedIfNecessary, {

  'when positions are equal': {
    arrange,

    act: ({ moveFinishedListener }) => act(moveFinishedListener,
      { row: 1, col: 2 }, { row: 1, col: 2 }),

    assert: {
      [`calls ${nameof<Controller>('moveFinished$')}`]:
      ({ moveFinishedListener: { moveFinished$ } }) => {
        expect(moveFinished$).to.have.been.calledOnceWithExactly()
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

      act: ({ moveFinishedListener }) => act(moveFinishedListener,
        previousPos, currentPos),

      assert: {
        [`does NOT call ${nameof<Controller>('moveFinished$')}`]:
        ({ moveFinishedListener: { moveFinished$ } }) => {
          // eslint-disable-next-line no-unused-expressions
          expect(moveFinished$).not.to.have.been.called
        },
      },
    },
  })),

})

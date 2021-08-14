import { expect } from 'chai'
import sinon from 'sinon'
import Position from '../../../domain/Position'
import { UpdateFinishedListener } from '../../../infra/Controller'
import { myStub } from '../../../my-libs/my-stub'
import { a3 } from '../../../my-libs/my-testing-library'
import nameof from '../../../my-libs/nameof'
import anticipateUpdateFinishedIfNecessary from './anticipateUpdateFinishedIfNecessary'

const arrange = ({ areEqual }: { areEqual: boolean }) => {
  const previousPos = {} as Position
  const currentPos = myStub(Position, 'equals', [previousPos], areEqual)
  return {
    previousPos,
    currentPos,
    updateFinishedListener: { updateFinished$: sinon.spy() } as UpdateFinishedListener,
  }
}

const act = (
  { updateFinishedListener, currentPos, previousPos }:
  {
    updateFinishedListener: UpdateFinishedListener
    currentPos: Position
    previousPos: Position
  }
) => {
  anticipateUpdateFinishedIfNecessary(updateFinishedListener, previousPos,
    currentPos)
  return { updateFinishedListener }
}

a3(anticipateUpdateFinishedIfNecessary, {

  'when positions are equal': {
    arrange: () => arrange({ areEqual: true }),
    act,
    assert: {
      [`calls ${nameof<UpdateFinishedListener>('updateFinished$')}`]:
      ({ updateFinishedListener: { updateFinished$ } }) => {
        expect(updateFinished$).to.have.been.calledOnceWithExactly()
      },
    },
  },

  'when positions are different': {
    arrange: () => arrange({ areEqual: false }),
    act,
    assert: {
      [`does NOT call ${nameof<UpdateFinishedListener>('updateFinished$')}`]:
        ({ updateFinishedListener: { updateFinished$ } }) => {
          // eslint-disable-next-line no-unused-expressions
          expect(updateFinished$).not.to.have.been.called
        },
    },
  },

})

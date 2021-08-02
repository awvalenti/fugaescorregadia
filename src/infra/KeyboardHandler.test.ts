import { anything, instance, mock, verify, when } from 'ts-mockito'
import { a3 } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import KeyboardHandler from './KeyboardHandler'
import KeyDownListener from './KeyDownListener'

const arrange = () => {
  const
    MockDocument = mock(Document),
    MockKeyDownListener = mock(KeyDownListener),

    stubbedOnKeyDown$ = () => {}

  when(MockKeyDownListener.onKeyDown$).thenReturn(stubbedOnKeyDown$)

  return {
    MockDocument,
    sut: new KeyboardHandler(
      instance(MockDocument),
      instance(MockKeyDownListener),
    ),
    stubbedOnKeyDown$,
  }
}

a3(KeyboardHandler, {

  [nameof<KeyboardHandler>('enable$')]: {
    arrange,

    act: arranged => {
      arranged.sut.enable$()
      return arranged
    },

    assert: {
      'adds keydown listener to document':
      ({ MockDocument, stubbedOnKeyDown$ }) => {
        verify(MockDocument.addEventListener(anything(), anything())).once()
        verify(MockDocument.addEventListener('keydown', stubbedOnKeyDown$))
          .called()
      },
    },
  },

  [nameof<KeyboardHandler>('disable$')]: {
    arrange,

    act: arranged => {
      arranged.sut.disable$()
      return arranged
    },

    assert: {
      'removes keydown listener from document':
      ({ MockDocument, stubbedOnKeyDown$ }) => {
        verify(MockDocument.removeEventListener(anything(), anything()))
          .once()
        verify(MockDocument.removeEventListener('keydown', stubbedOnKeyDown$))
          .called()
      },
    },
  },

})

import { DOWN, LEFT, RIGHT, UP } from '../domain/Direction'
import { a4, each, expect } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import KeyMapper from './KeyMapper'

a4(KeyMapper, {

  [nameof<KeyMapper>('directionFor')]: {
    'for mapped keys': {
      ...each([
        ['Arrows', ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']],
        ['WASD', ['KeyA', 'KeyW', 'KeyD', 'KeyS']],
        ['HJKL', ['KeyH', 'KeyK', 'KeyL', 'KeyJ']],
        ['Numpad', ['Numpad4', 'Numpad8', 'Numpad6', 'Numpad2']],
      ] as const, ([keysGroup, codes]) => ({
        [keysGroup]: {
          arrange: () => new KeyMapper(),
          act: sut => codes.map(code => sut.directionFor(code)),
          assert: {
            'maps key codes to game directions': result => {
              expect(result).to.deep.equal([LEFT, UP, RIGHT, DOWN])
            },
          },
        },
      })),
    },

    ...each(['Escape', 'Enter', 'KeyQ', 'Digit1'], key => ({
      'for non-mapped keys': {
        arrange: () => new KeyMapper(),
        act: sut => sut.directionFor(key),
        assert: {
          'returns null': result => {
            // eslint-disable-next-line no-unused-expressions
            expect(result).to.be.null
          },
        },
      },
    })),

  },

})

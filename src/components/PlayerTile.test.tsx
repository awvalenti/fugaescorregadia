import * as React from 'react'
import Position from '../domain/Position'
import { PLAYER } from '../domain/TileId'
import { a3, cleanup, each, expect, Mooca, render } from '../my-libs/my-testing-library'
import nameof from '../my-libs/nameof'
import PlayerTile from './PlayerTile'
import * as Tile from './Tile'

const arrange = (currentPos: Position) => {
  const mooca = new Mooca()

  mooca.stub(Tile, ({ tileId, style }) => <p style={style}>{tileId}</p>)

  return {
    mooca,
    component: render(<PlayerTile currentPos={currentPos} />),
  }
}

const after = ({ mooca }: { mooca: Mooca }) => {
  mooca.restore()
  cleanup()
}

a3(PlayerTile, {
  'on mount': {
    arrange: () => arrange({ row: 1, col: 2 }),

    act: ({ component: { container: ret } }) => ret,

    assert: {
      [`renders a ${PLAYER} <${nameof(Tile)}>`]: ({ firstElementChild }) => {
        expect(firstElementChild).to.have.property('textContent', 'PLAYER')
      },

      'sets translation to 100% * position (x for col, y for row)':
      ({ firstElementChild }) => {
        expect(firstElementChild).to.have.nested.property(
          'style.transform', 'translate(200%, 100%)')
      },

      'sets animation duration to zero': ({ firstElementChild }) => {
        expect(firstElementChild).to.have.nested.property(
          'style.transitionDuration', '0ms')
      },
    },

    after,
  },

  'on rerender': {
    ...each([
      [1, 0, 40],
      [0, 2, 80],
    ], ([row, col, duration]) => ({
      [`moving to { row: ${row}, col: ${col}}`]: {
        arrange: () => arrange({ row: 0, col: 0 }),

        act: ({ component: { rerender, container } }) => {
          rerender(<PlayerTile currentPos={{ row, col }} />)
          return container
        },

        assert: {
          [`sets animation duration to ${duration}ms`]:
          ({ firstElementChild }) => {
            expect(firstElementChild).to.have.nested.property(
              'style.transitionDuration', `${duration}ms`)
          },
        },

        after,

      },
    })),
  },
})

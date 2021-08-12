import { renderHook } from '@testing-library/react-hooks'
import Position from '../../domain/Position'
import { a3, expect } from '../../my-libs/my-testing-library'
import usePrevious from './usePrevious'

const arrange = () => renderHook(({ pos }) => usePrevious(pos),
  { initialProps: { pos: new Position(1, 1) } })

a3(usePrevious, {
  'on first render': {
    arrange,
    assert: {
      'returns initial value': ({ result }) => {
        expect(result.current).to.deep.equal(new Position(1, 1))
      },
    },
  },

  'on rerender': {
    arrange,
    assert: {
      'returns value from previous render': ({ result, rerender }) => {
        rerender({ pos: new Position(2, 2) })
        expect(result.current).to.deep.equal(new Position(1, 1))
        rerender({ pos: new Position(3, 3) })
        expect(result.current).to.deep.equal(new Position(2, 2))
      },
    },
  },
})

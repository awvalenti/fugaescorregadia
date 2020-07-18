import { renderHook } from '@testing-library/react-hooks'
import { a3, expect } from '../../my-libs/my-testing-library'
import usePrevious from './usePrevious'

const arrange = () => renderHook(({ pos }) => usePrevious(pos),
  { initialProps: { pos: { row: 1, col: 1 } } })

a3(usePrevious, {
  'on first render': {
    arrange,
    assert: {
      'returns initial value': ({ result }) => {
        expect(result.current).to.deep.equal({ row: 1, col: 1 })
      },
    },
  },

  'on rerender': {
    arrange,
    assert: {
      'returns value from previous render': ({ result, rerender }) => {
        rerender({ pos: { row: 2, col: 2 } })
        expect(result.current).to.deep.equal({ row: 1, col: 1 })
        rerender({ pos: { row: 3, col: 3 } })
        expect(result.current).to.deep.equal({ row: 2, col: 2 })
      },
    },
  },
})

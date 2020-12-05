import { createContext } from 'react'

export default createContext({
  moveFinishedListener: {
    moveFinished$: (): void => {
      throw Error('moveFinishedListener not defined')
    },
  },
})

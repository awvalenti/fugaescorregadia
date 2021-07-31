import { createContext } from 'react'
import { MoveFinishedListener } from '../../infra/Controller'

export default createContext(undefined! as {
  moveFinishedListener: MoveFinishedListener
})

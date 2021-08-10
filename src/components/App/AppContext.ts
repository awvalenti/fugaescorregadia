import { createContext } from 'react'
import { UpdateFinishedListener } from '../../infra/Controller'

export default createContext(undefined! as {
  updateFinishedListener: UpdateFinishedListener
})

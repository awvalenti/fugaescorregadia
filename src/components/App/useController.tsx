import { useEffect } from 'react'
import Controller, { UpdateGameStateFn } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'

const useController = (
  controller: Controller,
  keyboardHandler: KeyboardHandler,
  setGameState: UpdateGameStateFn,
) => {

  useEffect(() => {
    controller.setUpdateGameStateFn(setGameState)
  }, [controller, setGameState])

  useEffect(() => {
    keyboardHandler.enable()
    return () => keyboardHandler.disable()
  }, [keyboardHandler])

}

export default useController

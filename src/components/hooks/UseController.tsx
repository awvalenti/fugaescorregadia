import { useEffect } from 'react'
import Controller, { UpdateGameStateFn$ } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'

export default class UseController {

  private readonly _controller: Controller
  private readonly _keyboardHandler: KeyboardHandler

  constructor(controller: Controller, keyboardHandler: KeyboardHandler) {
    this._controller = controller
    this._keyboardHandler = keyboardHandler
  }

  run$(updateGameStateFn$: UpdateGameStateFn$): void {
    useEffect(() => {
      this._controller.setUpdateGameStateFn$(updateGameStateFn$)
    }, [updateGameStateFn$])

    useEffect(() => {
      this._keyboardHandler.enable$()
      return () => this._keyboardHandler.disable$()
    }, [])
  }

}

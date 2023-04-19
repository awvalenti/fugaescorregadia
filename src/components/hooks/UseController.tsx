import { useEffect } from 'react'
import { StorageForUpdateGameStateFn, UpdateGameState$ } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'

export default class UseController {

  private readonly _storage: StorageForUpdateGameStateFn
  private readonly _keyboardHandler: KeyboardHandler

  constructor(storage: StorageForUpdateGameStateFn, keyboardHandler: KeyboardHandler) {
    this._storage = storage
    this._keyboardHandler = keyboardHandler
  }

  run$(updateGameStateFn$: UpdateGameState$): void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      this._storage.setUpdateGameStateFn$(updateGameStateFn$)
    }, [updateGameStateFn$])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      this._keyboardHandler.enable$()
      return () => this._keyboardHandler.disable$()
    }, [])
  }

}

import { useEffect } from 'react'
import { StorageForUpdateGameStateFn, UpdateGameStateFn$ } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'

export default class UseController {

  private readonly _storage: StorageForUpdateGameStateFn
  private readonly _keyboardHandler: KeyboardHandler

  constructor(storage: StorageForUpdateGameStateFn, keyboardHandler: KeyboardHandler) {
    this._storage = storage
    this._keyboardHandler = keyboardHandler
  }

  run$(updateGameStateFn$: UpdateGameStateFn$): void {
    useEffect(() => {
      this._storage.setUpdateGameStateFn$(updateGameStateFn$)
    }, [updateGameStateFn$])

    useEffect(() => {
      this._keyboardHandler.enable$()
      return () => this._keyboardHandler.disable$()
    }, [])
  }

}

import { useEffect } from 'react'
import Direction from '../../domain/Direction'
import { StorageForUpdateGameStateFn } from '../../infra/Controller'
import KeyboardHandler from '../../infra/KeyboardHandler'

export default class UseController {

  private readonly _storage: StorageForUpdateGameStateFn
  private readonly _keyboardHandler: KeyboardHandler

  constructor(storage: StorageForUpdateGameStateFn, keyboardHandler: KeyboardHandler) {
    this._storage = storage
    this._keyboardHandler = keyboardHandler
  }

  run$(fn: (d: Direction) => void): void {
    useEffect(() => {
      this._storage.setUpdateGameStateFn$(fn)
    }, [fn])

    useEffect(() => {
      this._keyboardHandler.enable$()
      return () => this._keyboardHandler.disable$()
    }, [])
  }

}

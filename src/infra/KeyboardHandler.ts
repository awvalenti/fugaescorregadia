import KeyDownListener from './KeyDownListener'

export default class KeyboardHandler {

  private readonly _document: Document
  private readonly _keyDownListener: KeyDownListener

  constructor(
    document: Document,
    keyDownListener: KeyDownListener,
  ) {
    this._document = document
    this._keyDownListener = keyDownListener
  }

  enable$(): void {
    this._document.addEventListener('keydown', this._keyDownListener.onKeyDown$)
  }

  disable$(): void {
    this._document.removeEventListener('keydown', this._keyDownListener.
      onKeyDown$)
  }

}

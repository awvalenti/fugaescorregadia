import Controller from './Controller'
import KeyMapper from './KeyMapper'

export default class KeyboardInputHandler {

  private readonly _document: Document
  private readonly _keyMapper: KeyMapper
  private readonly _controller: Controller

  constructor(
    document: Document,
    keyMapper: KeyMapper,
    controller: Controller,
  ) {
    this._document = document
    this._keyMapper = keyMapper
    this._controller = controller

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  enable(): void {
    this._document.addEventListener('keydown', this.onKeyDown)
  }

  disable(): void {
    this._document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown({ code }: KeyboardEvent): void {
    const dir = this._keyMapper.directionFor(code)
    if (dir) this._controller.dispatchMove(dir)
  }

}

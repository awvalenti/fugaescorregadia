import Controller from './Controller'
import KeyMapper from './KeyMapper'

export default class KeyDownListener {

  private readonly _keyMapper: KeyMapper
  private readonly _controller: Controller

  constructor(
    keyMapper: KeyMapper,
    controller: Controller,
  ) {
    this._keyMapper = keyMapper
    this._controller = controller
    this.onKeyDown$ = this.onKeyDown$.bind(this)
  }

  onKeyDown$({ code }: KeyboardEvent): void {
    const dir = this._keyMapper.directionFor(code)
    if (dir) this._controller.dispatchMove$(dir)
  }

}

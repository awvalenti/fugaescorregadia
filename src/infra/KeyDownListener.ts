import myBind from '../my-libs/my-bind'
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
    myBind(this as KeyDownListener, 'onKeyDown$')
  }

  onKeyDown$({ code }: KeyboardEvent): void {
    const dir = this._keyMapper.directionFor(code)
    if (dir) this._controller.dispatchMove$(dir)
  }

}

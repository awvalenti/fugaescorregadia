import myBind from '../my-libs/my-bind'
import { MoveDispatcher } from './Controller'
import KeyMapper from './KeyMapper'

export default class KeyDownListener {

  private readonly _keyMapper: KeyMapper
  private readonly _moveDispatcher: MoveDispatcher

  constructor(
    keyMapper: KeyMapper,
    moveDispatcher: MoveDispatcher,
  ) {
    this._keyMapper = keyMapper
    this._moveDispatcher = moveDispatcher
    myBind(this as KeyDownListener, 'onKeyDown$')
  }

  onKeyDown$({ code }: KeyboardEvent): void {
    const dir = this._keyMapper.directionFor(code)
    if (dir) this._moveDispatcher.dispatchMove$(dir)
  }

}

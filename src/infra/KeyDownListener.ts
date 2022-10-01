import myBind from '../my-libs/my-bind'
import { MoveDispatcher } from './Controller'
import KeyMapper from './KeyMapper'

export default class KeyDownListener {

  private readonly _keyMapper: KeyMapper
  private readonly _moveDispatcher: MoveDispatcher
  // bla: (d: Direction) => void

  constructor(
    keyMapper: KeyMapper,
    moveDispatcher: MoveDispatcher,
    // bla: (d: Direction) => void
  ) {
    this._keyMapper = keyMapper
    this._moveDispatcher = moveDispatcher
    // this.bla = bla
    myBind(this as KeyDownListener, 'onKeyDown$')
  }

  onKeyDown$({ code }: KeyboardEvent): void {
    const dir = this._keyMapper.directionFor(code)
    if (dir) this._moveDispatcher.dispatchMove$(dir)
    // if (dir) this.bla(dir)
  }

}

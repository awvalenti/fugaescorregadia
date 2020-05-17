import Direction, { DOWN, LEFT, RIGHT, UP } from '../domain/Direction'

export default class KeyMapper {

  // eslint-disable-next-line complexity
  directionFor(code: string): Direction | null {
    switch (code) {
      case 'ArrowLeft':
      case 'KeyA':
      case 'KeyH':
      case 'Numpad4':
        return LEFT

      case 'ArrowUp':
      case 'KeyW':
      case 'KeyK':
      case 'Numpad8':
        return UP

      case 'ArrowRight':
      case 'KeyD':
      case 'KeyL':
      case 'Numpad6':
        return RIGHT

      case 'ArrowDown':
      case 'KeyS':
      case 'KeyJ':
      case 'Numpad2':
        return DOWN

      default: return null
    }
  }

}

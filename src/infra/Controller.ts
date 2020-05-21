import Direction from '../domain/Direction'

export default abstract class Controller {

  abstract dispatchMove(direction: Direction): void

}

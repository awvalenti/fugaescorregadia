export default class Direction {
  private readonly _name: string

  readonly rowInc: number
  readonly colInc: number

  private constructor(name: string, rowInc: number, colInc: number) {
    this._name = name
    this.rowInc = rowInc
    this.colInc = colInc
  }

  toString(): string {
    return this._name
  }

  static readonly LEFT = new Direction('LEFT', 0, -1)
  static readonly UP = new Direction('UP', -1, 0)
  static readonly RIGHT = new Direction('RIGHT', 0, 1)
  static readonly DOWN = new Direction('DOWN', 1, 0)
}

export const { LEFT, UP, RIGHT, DOWN } = Direction

export default interface Direction extends String {
  rowInc: number
  colInc: number
}

const newDir = (name: string, rowInc: number, colInc: number): Direction =>
  Object.assign(name, { rowInc, colInc })

export const LEFT = newDir('LEFT', 0, -1)
export const UP = newDir('UP', -1, 0)
export const RIGHT = newDir('RIGHT', 0, 1)
export const DOWN = newDir('DOWN', 1, 0)

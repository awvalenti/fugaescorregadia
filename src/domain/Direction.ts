import Position from './Position'

export default interface Direction extends String, Position {}

export const LEFT: Direction = Object.assign('LEFT', { row: 0, col: -1 })
export const UP: Direction = Object.assign('UP', { row: -1, col: 0 })
export const RIGHT: Direction = Object.assign('RIGHT', { row: 0, col: +1 })
export const DOWN: Direction = Object.assign('DOWN', { row: +1, col: 0 })

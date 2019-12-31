import aDefault, { x as aX, y as aY } from './module-a'

export default () => aDefault()

export const x = (n: number) => aX(n)

export const y = () => aY()

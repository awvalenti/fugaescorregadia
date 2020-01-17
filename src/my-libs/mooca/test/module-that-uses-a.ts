import aDefault, { x as aX } from './module-a'

export default () => aDefault()

export const x = (n: number) => aX(n)

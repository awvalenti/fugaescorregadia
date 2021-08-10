import { ComponentType, FC, MemoExoticComponent } from 'react'

interface Nameof {
  (fn: Function): string
  <T extends ComponentType<any>>(Component: FC<T> | MemoExoticComponent<T>): string
  <U, M = keyof U & string>(methodName: M): M
  (moduleWithFunction: { default: Function }): string
}
function abort(arg: any) {
  throw Error(`nameof called with invalid arg: ${arg} | ${JSON.stringify(arg)}`)
}

// eslint-disable-next-line complexity
const nameof: Nameof = (arg: any) =>
  typeof arg === 'string' && arg ||
  arg.default && nameof(arg.default) ||
  arg.name ||
  arg.displayName ||
  abort(arg)

export default nameof

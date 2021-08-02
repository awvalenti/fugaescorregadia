import { MethodsNames } from '../my-types'

function nameof<T, M = MethodsNames<T>>(methodName: M): M
function nameof(fn: Function | { default: Function }): string

function nameof<T, M = MethodsNames<T>>(
  arg0: M | Function | { default: Function },
): string {
  if (typeof arg0 === 'string') {
    const methodName = arg0
    return methodName
  } else {
    const fn = arg0
    return (fn as Function)?.name || (fn as { default: Function })?.default?.name || (() => {
      throw Error(`Unnamed or invalid function: ${fn}`)
    })()
  }
}

export default nameof

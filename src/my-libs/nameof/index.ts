import { MethodsNames } from '../my-types'

function nameof<T, M = MethodsNames<T>>(methodName: M): M & string
function nameof(fn: Function | { default: Function }): string

function nameof<T, M = MethodsNames<T>>(
  arg0: M | Function | { default: Function },
): string {
  if (typeof arg0 === 'string') {
    const methodName = arg0
    return methodName
  } else {
    const fn = arg0
    const ret = (fn as Function)?.name || (fn as { default: Function })?.default?.name
    if (!ret) throw Error(`Unnamed or invalid function: ${fn}`)
    return ret
  }
}

export default nameof

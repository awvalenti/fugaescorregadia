import { MethodsNames } from '../../my-types'

export default function myBind<
  T extends object,
  M extends MethodsNames<T>
>(object: T, methodName: M) {
  object[methodName] = (object[methodName] as Function).bind(object)
}

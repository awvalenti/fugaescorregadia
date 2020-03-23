import { instance, mock, when } from 'ts-mockito'
import { MethodsNames } from '../my-types'

export function myStub<C, M extends MethodsNames<C>>(
  clazz: new(..._: any) => C,
  methodName: M,
  inputArgs: Parameters<C[M]>,
  returnValue: ReturnType<C[M]>
): C {
  const mockClass: C = mock(clazz)
  when(mockClass[methodName](...inputArgs)).thenReturn(returnValue)
  return instance(mockClass)
}

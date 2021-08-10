import { FunctionComponent, memo } from 'react'

const pureComponent = <T>(Comp: FunctionComponent<T>) =>
  Object.assign(memo(Comp), { displayName: Comp.name || Comp.displayName })

export default pureComponent

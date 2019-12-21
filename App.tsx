import * as React from 'react'
import Board from './src/components/Board'

export type Type = React.FC<{

}>

const App: Type = () =>
  <Board matrix={[[]]} />

export default App

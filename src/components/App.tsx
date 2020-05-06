import * as React from 'react'
import Level from '../domain/level/Level'
import nameof from '../my-libs/nameof'
import './App.sass'
import Board from './Board'

const App: React.FC<{

  level: Level

}> = ({ level }) =>
  <main className={nameof(App)}>
    <Board level={level} />
  </main>

export default App

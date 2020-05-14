import * as React from 'react'
import GameState from '../domain/GameState'
import nameof from '../my-libs/nameof'
import './App.sass'
import Board from './Board'

const App: React.FC<{

  gameState: GameState

}> = ({ gameState: { level, playerPos } }) =>
  <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} />
  </main>

export default App

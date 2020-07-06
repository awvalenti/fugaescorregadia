import * as React from 'react'
import { useState } from 'react'
import GameState from '../../domain/GameState'
import nameof from '../../my-libs/nameof'
import Board from '../Board'
import './App.sass'
import UseController from './UseController'

const App: React.FC<{

  gameState: GameState
  useController: UseController

}> = ({
  gameState,
  useController,
}) => {
  const [{ level, playerPos }, setGameState] = useState(gameState)

  useController.run(setGameState)

  return <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} />
  </main>
}

export default App

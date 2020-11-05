import * as React from 'react'
import { useState } from 'react'
import GameState from '../../domain/GameState'
import { MoveFinishedListener } from '../../infra/Controller'
import nameof from '../../my-libs/nameof'
import Board from '../Board'
import UseController from '../hooks/UseController'
import './App.sass'

const App: React.FC<{

  gameState: GameState
  useController: UseController
  moveFinishedListener: MoveFinishedListener

}> = ({
  gameState,
  useController,
  moveFinishedListener,
}) => {
  const [{ level, playerPos }, setGameState] = useState(gameState)

  useController.run$(setGameState)

  return <main className={nameof(App)}>
    <Board
      level={level}
      playerPos={playerPos}
      moveFinishedListener={moveFinishedListener}
    />
  </main>
}

export default App

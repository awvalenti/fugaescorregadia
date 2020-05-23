import * as React from 'react'
import GameState from '../../domain/GameState'
import { UpdateGameStateFn } from '../../infra/Controller'
import nameof from '../../my-libs/nameof'
import Board from '../Board'
import './App.sass'

export type UseController = (arg0: UpdateGameStateFn) => void

const App: React.FC<{

  gameState: GameState
  useController: UseController

}> = ({
  gameState,
  useController,
}) => {
  const [{ level, playerPos }, setGameState] = React.useState(gameState)

  useController(setGameState)

  return <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} />
  </main>
}

export default App

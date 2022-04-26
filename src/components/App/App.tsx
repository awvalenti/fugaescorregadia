import * as React from 'react'
import { useState } from 'react'
import GameState from '../../domain/GameState'
import { UpdateFinishedListener } from '../../infra/Controller'
import nameof from '../../my-libs/nameof'
import Board from '../Board'
import UseController from '../hooks/UseController'
import './App.sass'
import AppContext from './AppContext'

const App: React.FC<{

  gameState: GameState
  useController: UseController
  updateFinishedListener: UpdateFinishedListener

}> = ({
  gameState,
  useController,
  updateFinishedListener,
}) => {
  const [gs, setGameState] = useState(gameState)
  const { level, playerPos } = gs

  useController.run$(setGameState)

  return <AppContext.Provider value={{ updateFinishedListener }}>
    <main className={nameof(App)}>
      <Board
        level={level}
        playerPos={playerPos}
        // still={gs instanceof StillGameState}
      />
    </main>
  </AppContext.Provider>
}

export default App

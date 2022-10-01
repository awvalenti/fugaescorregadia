import * as React from 'react'
import { useState } from 'react'
import Direction from '../../domain/Direction'
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
  const [q, setQ] = useState<Direction[]>([])

  useController.run$(nextGsFn => {
    setQ(oldQ => oldQ.length >= 3 ? oldQ : [...oldQ])
    setGameState(nextGsFn)
  })

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

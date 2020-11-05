import * as React from 'react'
import { useState } from 'react'
import GameState from '../../domain/GameState'
import nameof from '../../my-libs/nameof'
import Board from '../Board'
import UseController from '../hooks/UseController'
import './App.sass'

const pc = {}

const App: React.FC<{

  gameState: GameState
  useController: UseController

}> = ({
  gameState,
  useController,
}) => {
  const [{ level, playerPos }, setGameState] = useState(gameState)

  function ote() {
    console.log('pc.resolve')

    pc.resolve()
    // pc.resolve = null
  }

  // console.time('setgamestate1')
  useController.run$(async gs => {
    // if (pc.resolve) return
    // console.time('setgamestate')

    setGameState(gs)
    await new Promise(resolve => {
      pc.resolve = resolve
      // setTimeout(resolve, 40 * 20)
    })
  })

  const x = <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} ote={ote}/>
  </main>

  // console.timeEnd('setgamestate1')
  // console.timeEnd('setgamestate')

  return x
}

export default App

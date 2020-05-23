import * as React from 'react'
import GameState from '../domain/GameState'
import Controller from '../infra/Controller'
import KeyboardHandler from '../infra/KeyboardHandler'
import nameof from '../my-libs/nameof'
import './App.sass'
import Board from './Board'

const App: React.FC<{

  gameState: GameState
  keyboardHandler: KeyboardHandler
  controller: Controller

}> = ({
  gameState,
  controller,
  keyboardHandler,
}) => {
  const [{ level, playerPos }, setGameState] = React.useState(gameState)

  React.useEffect(() => {
    controller.setUpdateGameStateFn(setGameState)
  }, [controller])

  React.useEffect(() => {
    keyboardHandler.enable()
    return () => keyboardHandler.disable()
  }, [keyboardHandler])

  return <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} />
  </main>
}

export default App

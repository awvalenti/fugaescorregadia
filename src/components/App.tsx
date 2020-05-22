import * as React from 'react'
import GameState from '../domain/GameState'
import Controller from '../infra/Controller'
import KeyboardInputHandler from '../infra/KeyboardInputHandler'
import nameof from '../my-libs/nameof'
import './App.sass'
import Board from './Board'

const App: React.FC<{

  gameState: GameState
  keyboardInputHandler: KeyboardInputHandler
  controller: Controller

}> = ({
  gameState,
  controller,
  keyboardInputHandler,
}) => {
  const [{ level, playerPos }, setGameState] = React.useState(gameState)

  React.useEffect(() => {
    controller.setUpdateGameStateFn(setGameState)
  }, [controller])

  React.useEffect(() => {
    keyboardInputHandler.enable()
    return () => keyboardInputHandler.disable()
  }, [keyboardInputHandler])

  return <main className={nameof(App)}>
    <Board level={level} playerPos={playerPos} />
  </main>
}

export default App

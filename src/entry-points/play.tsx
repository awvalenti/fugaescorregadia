import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import di from '../di/prod'

ReactDOM.render(
  <App
    gameState={di.gameStateFactory.new()}
    controller={di.controller}
    keyboardHandler={di.keyboardHandler}
  />,
  document.getElementById('react-root')
)

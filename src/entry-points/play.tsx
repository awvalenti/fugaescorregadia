import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App/App'
import di from '../di/prod'

ReactDOM.render(
  <App
    gameState={di.gameStateFactory.new()}
    useController={di.useController}
    moveFinishedListener={di.moveFinishedListener}
  />,
  document.getElementById('react-root')
)

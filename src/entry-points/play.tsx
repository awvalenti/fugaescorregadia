import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App/App'
import di from '../di/prod'

ReactDOM.render(
  <App
    gameState={di.gameState}
    useController={di.useController}
    updateFinishedListener={di.updateFinishedListener}
  />,
  document.getElementById('react-root')
)

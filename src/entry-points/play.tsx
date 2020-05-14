import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import di from '../di/prod'

ReactDOM.render(
  <App gameState={di.gameStateFactory.new()} />,
  document.getElementById('react-root')
)

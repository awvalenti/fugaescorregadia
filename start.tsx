import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App'
import di from './src/di/prod'

ReactDOM.render(
  <App level={di.levelRepo.get(0)} />,
  document.getElementById('react-root')
)

import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import di from '../di/prod'

ReactDOM.render(
  <App level={di.levelRepo.get(0)} />,
  document.getElementById('react-root')
)

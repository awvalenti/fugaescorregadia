import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../components/App/App'
import di from '../di/prod'

ReactDOM.createRoot(document.getElementById('react-root')!).render(
  // TODO Make animations work in StrictMode
  // <React.StrictMode>
  <App
    gameState={di.gameState}
    useController={di.useController}
    updateFinishedListener={di.updateFinishedListener}
  />
  // </React.StrictMode>
)

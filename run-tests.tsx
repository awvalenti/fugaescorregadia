import { Mocha, mocha } from 'mocha'

mocha.setup('bdd')

import './src/test/load-tests'

const runner = mocha.run()

runner.on(Mocha.Runner.constants.EVENT_RUN_END, () => {
  const icon = runner.failures === 0 ? '✔️' : '❌'
  document.title = icon
  document.getElementById('test-running-indicator').className = icon
})

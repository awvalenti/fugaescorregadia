import { Mocha, mocha } from 'mocha'

mocha.setup('bdd')

import './Hello.test'

const runner = mocha.run()

runner.on(Mocha.Runner.constants.EVENT_RUN_END, () => {
  const icon = runner.failures === 0 ? '✔️' : '❌'
  document.title = icon
  document.getElementById('test-running-indicator').className = icon
})

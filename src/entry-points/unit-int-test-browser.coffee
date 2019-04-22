require 'mocha'

mocha.setup 'bdd'

# Possible options for mocha
# do mocha.checkLeaks
# do mocha.allowUncaught

require '/test/load-unit-int-tests'

runner = do mocha.run

runner.on Mocha.Runner.constants.EVENT_RUN_END, ->
  icon = if runner.failures is 0 then '✔️' else '❌'
  document.title = icon
  document.getElementById('test-running-indicator').className = icon

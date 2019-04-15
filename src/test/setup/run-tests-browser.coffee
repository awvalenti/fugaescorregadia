changeResult = (icon) ->
  document.title = icon
  document.getElementById('test-running-indicator').className = icon

# Mocha doesn't work well with ParcelJS soft reload.
# When ParcelJS does a soft reload, we do a hard one.
if Mocha?
  changeResult '⏳'
  do location.reload
  return

require 'mocha'

mocha.setup 'bdd'

# Possible options for mocha
# do mocha.checkLeaks
# do mocha.allowUncaught

require '/test/setup/load-tests'

runner = do mocha.run

runner.on Mocha.Runner.constants.EVENT_RUN_END, ->
  changeResult if runner.failures is 0 then '✔️' else '❌'

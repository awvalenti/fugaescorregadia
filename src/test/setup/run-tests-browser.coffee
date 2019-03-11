# Mocha doesn't work well with ParcelJS soft reload.
# When ParcelJS does a soft reload, we do a hard one.
if Mocha?
  document.title = '⏳'
  location.reload()
  return

require 'mocha'

mocha.setup 'bdd'
# mocha.checkLeaks()
# mocha.allowUncaught()

require '/test/setup/load-tests.coffee'

runner = mocha.run()

runner.on Mocha.Runner.constants.EVENT_RUN_END, ->
  document.title = if runner.failures is 0 then '✔️' else '❌'

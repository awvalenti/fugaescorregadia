# Mocha doesn't work well with ParcelJS soft reload.
# When ParcelJS does a soft reload, we do a hard one.
if Mocha?
  location.reload()
  return

require 'mocha'

mocha.setup 'bdd'
# mocha.checkLeaks()
# mocha.allowUncaught()

require '/test/setup/load-tests.coffee'

mocha.run()

fs = require 'fs'

module.exports = (levelIndex) ->
  # We can't concatenate strings to generate path, since it must be static.
  # We can lazy-load only the desired level.
  levelContent = {
    0: -> fs.readFileSync "#{__dirname}/../../src/levels/00.level"
  }[levelIndex]()

  ROWS = 20
  COLUMNS = 20

  actual = levelContent.length
  expected = ROWS * COLUMNS * 2
  throw Error "#{actual} length != #{expected}" if actual != expected

  MAPPING =
    '_': 'empty'
    'x': 'exit'
    'o': 'obstacle'
    's': 'starting-point'

  readerIndex = 0

  [0...ROWS].map ->
    [0...COLUMNS].map ->
      loop
        tileChar = String.fromCharCode levelContent[readerIndex++]
        break unless tileChar in [' ', '\n']
      tileType = MAPPING[tileChar]
      throw Error "'#{tileChar}' <-- invalid tileChar" if not tileType?
      tileType

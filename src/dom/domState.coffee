fs = require 'fs'

levelContent = fs.readFileSync(__dirname + '/../../src/levels/00.level')

makeBoard = ->
  board = document.createElement 'div'
  board.className = 'board'

  MAPPING =
    '_': 'empty'
    'x': 'exit'
    'o': 'obstacle'
    's': 'starting-point'

  levelContent.forEach (charAsNumber) ->
    char = String.fromCharCode charAsNumber

    unless char in [' ', '\n']
      tileType = MAPPING[char]

      if not tileType
        throw Error "'#{char}' <-- invalid tile character"

      tile = document.createElement 'div'
      tile.className = "tile #{tileType}"
      board.appendChild tile

  ROWS = 20
  COLUMNS = 20

  actual = board.childElementCount
  expected = ROWS * COLUMNS
  if actual != expected
    throw Error "#{actual} tiles; should have #{expected}"

  board

module.exports = (i18n) ->
  title: i18n 'title'
  board: makeBoard()

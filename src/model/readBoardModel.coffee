fs = require 'fs'

module.exports = (levelIndex) ->
  # We can't concatenate strings to generate path, since it must be static.
  # We can lazy-load only the desired level.
  levelBytes = {
    0: -> fs.readFileSync "#{__dirname}/../../src/levels/00.level"
  }[levelIndex]()

  mapping = (tileChar) ->
    switch tileChar
      when '_' then 'empty'
      when 'x' then 'exit'
      when 'o' then 'obstacle'
      when 's' then 'starting-point'
      else throw Error "'#{tileChar}' <-- invalid tileChar"

  # Solution 1
  String levelBytes
    .replace /\s+$/gm, ''
    .split '\n'
    .map (row) -> row.split(' ').map mapping

  # # Solution 2
  # ROWS = 20
  # COLUMNS = 20
  # readerIndex = 0
  # Array(ROWS).fill().map ->
  #   Array(COLUMNS).fill().map ->
  #     loop
  #       tileChar = String.fromCharCode levelBytes[readerIndex++]
  #       break unless tileChar in [' ', '\n']
  #     mapping tileChar

  # # Solution 3
  # ROWS = 20
  # COLUMNS = 20
  # Array::map.call levelBytes, (charCode) -> String.fromCharCode charCode
  #   .filter (tileChar) -> tileChar not in [' ', '\n']
  #   .map mapping
  #   .reduce (ret, tileType, i) ->
  #     row = Math.floor i / COLUMNS
  #     col = i % COLUMNS
  #     ret[row] = Array COLUMNS if col == 0
  #     ret[row][col] = tileType
  #     ret
  #   , Array ROWS

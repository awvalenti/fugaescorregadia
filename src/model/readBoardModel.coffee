fs = require 'fs'

module.exports = (levelIndex) ->
  # We can't concatenate strings to generate path, since it must be static.
  # We can lazy-load only the desired level.
  lazyLoad = [
    -> fs.readFileSync "#{__dirname}/../../src/levels/00.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/01.level"
  ][levelIndex]

  throw Error "Level #{levelIndex} not created yet" if not lazyLoad?

  levelBytes = do lazyLoad

  mapping = (tileChar) ->
    switch tileChar
      when '_' then 'EMPTY'
      when 'g' then 'GOAL'
      when 'o' then 'OBSTACLE'
      when 's' then 'START'
      else throw Error "'#{tileChar}' <-- invalid tileChar"

  # # Solution 1
  # String levelBytes
  #   .replace /\s+$/gm, ''
  #   .split '\n'
  #   .map (row) -> row.split(' ').map mapping

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
  #   .reduce (ret, tileName, i) ->
  #     row = Math.floor i / COLUMNS
  #     col = i % COLUMNS
  #     ret[row] = Array COLUMNS if col == 0
  #     ret[row][col] = tileName
  #     ret
  #   , Array ROWS

  # Solution 4
  ROWS = 20
  COLUMNS = 20
  ret = Array ROWS
  tileCount = 0
  for charCode in levelBytes
    tileChar = String.fromCharCode charCode
    continue if tileChar in [' ', '\n']
    row = Math.floor tileCount / COLUMNS
    col = tileCount % COLUMNS
    ret[row] = Array COLUMNS if col == 0
    ret[row][col] = mapping tileChar
    ++tileCount
  ret

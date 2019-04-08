fs = require 'fs'

tileCharToTileName = (tileChar) ->
  switch tileChar
    when '-' then 'EMPTY'
    when 'g' then 'GOAL'
    when 'o' then 'OBSTACLE'
    when 's' then 'START'
    else throw Error "'#{tileChar}' <-- invalid tileChar"

readLevelString = (levelString) ->
  levelString
    .replace /\s+$/gm, ''
    .split '\n'
    .map (row) -> row.split(' ').map tileCharToTileName

readPredefinedLevel = (levelIndex) ->
  # We can't concatenate strings to generate path, since it must be static.
  # We can lazy-load only the desired level.
  lazyLoad = [
    -> fs.readFileSync "#{__dirname}/../../src/levels/00.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/01.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/02.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/03.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/04.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/05.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/06.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/07.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/08.level"
    -> fs.readFileSync "#{__dirname}/../../src/levels/09.level"
  ][levelIndex]

  throw Error "Level #{levelIndex} not created yet" if not lazyLoad?

  readLevelString String do lazyLoad

module.exports = (param) ->
  switch typeof param
    when 'number' then readPredefinedLevel param
    when 'string' then readLevelString param

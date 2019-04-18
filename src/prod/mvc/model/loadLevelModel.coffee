fs = require 'fs'

LEVELS_AS_STRINGS = [
  # Build process transforms these calls into static content directly on
  # source code. It works for paths starting with #{__dirname} concatenated
  # to compile-time strings. Creating a dynamic path by concatenating to a
  # number stored in a variable doesn't work.
  fs.readFileSync "#{__dirname}/levels/00.level"
  fs.readFileSync "#{__dirname}/levels/01.level"
  fs.readFileSync "#{__dirname}/levels/02.level"
  fs.readFileSync "#{__dirname}/levels/03.level"
  fs.readFileSync "#{__dirname}/levels/04.level"
  fs.readFileSync "#{__dirname}/levels/05.level"
  fs.readFileSync "#{__dirname}/levels/06.level"
  fs.readFileSync "#{__dirname}/levels/07.level"
  fs.readFileSync "#{__dirname}/levels/08.level"
].map String

module.exports = ({
  makeLevelModel = require '/prod/mvc/model/makeLevelModel'
}) ->

  levelsModels = LEVELS_AS_STRINGS.map makeLevelModel

  (levelNumber) ->
    levelsModels[levelNumber] ? throw Error "Level #{levelNumber} not available"

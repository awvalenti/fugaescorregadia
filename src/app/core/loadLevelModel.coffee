fs = require 'fs'

LEVELS_AS_STRINGS = [
  # Build process transforms these calls into static content directly on
  # source code. It works for paths that are compile-time strings (except
  # for the __dirname part). Creating a dynamic path by concatenating a
  # number doesn't work.
  fs.readFileSync "#{__dirname}/levels/00.level"
  fs.readFileSync "#{__dirname}/levels/01.level"
  fs.readFileSync "#{__dirname}/levels/02.level"
  fs.readFileSync "#{__dirname}/levels/03.level"
  fs.readFileSync "#{__dirname}/levels/04.level"
  fs.readFileSync "#{__dirname}/levels/05.level"
  fs.readFileSync "#{__dirname}/levels/06.level"
  fs.readFileSync "#{__dirname}/levels/07.level"
  fs.readFileSync "#{__dirname}/levels/08.level"
  fs.readFileSync "#{__dirname}/levels/09.level"
].map String

module.exports = ({
  makeLevelModel = require '/app/core/makeLevelModel'
}) ->

  levelsModels = LEVELS_AS_STRINGS.map makeLevelModel

  (levelNumber) ->
    levelsModels[levelNumber] ? throw Error "Level #{levelNumber} not available"

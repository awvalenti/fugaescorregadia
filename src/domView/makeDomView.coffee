mutateDivTile = require '/domView/mutateDivTile'
mutateTranslation = require '/domView/mutateTranslation'

makeTileDiv = (tileName) ->
  ret = document.createElement 'div'
  mutateDivTile tileName, ret
  ret

module.exports = (i18n) -> (gameModel) ->
  st = (do () ->
      for rule in document.styleSheets[0].cssRules
        return rule if rule.selectorText == '.tile'
    ).style
  st.width = 100 / gameModel.boardModel[0].length + '%'
  st.height = 100 / gameModel.boardModel.length + '%'

  boardDiv = document.createElement 'div'
  boardDiv.className = 'board'

  gameModel.boardModel.forEach (row) ->
    row.forEach (tileName) ->
      boardDiv.appendChild makeTileDiv tileName

  playerDiv = makeTileDiv 'PLAYER'

  boardDiv.appendChild playerDiv

  mutateTranslation gameModel.boardModel.length, gameModel.boardModel[0].length,
    gameModel.playerPos, playerDiv

  {title: i18n('title'), boardDiv, playerDiv}

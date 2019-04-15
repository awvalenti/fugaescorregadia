module.exports = ({
  i18n
  updateDivTile$
  setTranslation$
  version
}) ->
  makeTileDiv = (tileName) ->
    ret = document.createElement 'div'
    updateDivTile$ tileName, ret
    ret

  makePlayerDiv = (moveEndListener, {playerPos}) ->
    ret = makeTileDiv 'PLAYER'
    ret.addEventListener 'webkitTransitionEnd', moveEndListener
    ret.addEventListener 'transitionend', moveEndListener
    setTranslation$ playerPos, ret
    ret

  makeBoardDiv = (coreModel, playerDiv, viewMode) ->
    ret = document.createElement 'div'
    ret.className = 'board ' + viewMode

    coreModel.boardState.forEach (row) ->
      row.forEach (tileName) ->
        ret.appendChild makeTileDiv tileName
    ret.appendChild playerDiv
    ret

  (coreModel, levelNumber, viewMode, moveEndListener) ->
    playerDiv = makePlayerDiv moveEndListener, coreModel

    # XXX Maybe should build this element dynamically
    # instead of relying on its presence on the page
    levelNumberElement = document.getElementById('level-number')
    levelNumberElement.textContent = levelNumber

    {
      title: i18n 'title'
      version: 'v' + version
      levelText: i18n 'level'
      levelNumberElement
      boardDiv: makeBoardDiv coreModel, playerDiv, viewMode
      playerDiv
    }

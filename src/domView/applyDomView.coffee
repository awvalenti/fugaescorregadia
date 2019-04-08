{initialResize, throttledResize} = require '/domView/util/boardResizer'
getDynamicStyle = require '/domView/util/getDynamicStyle'

updateTexts = ({title, version, levelText}) ->
  document.title = title
  document.getElementById('version').textContent = version
  document.getElementById('level-text').textContent = levelText

updateMainElement = ({boardDiv}) ->
  main = document.querySelector 'main'

  # Clears DOM between ParcelJS reloads
  while do main.hasChildNodes
    main.removeChild main.lastChild

  main.appendChild boardDiv

updateTileSize = (rowCount, colCount) ->
  st = getDynamicStyle '.tile'
  st.width = 100 / colCount + '%'
  st.height = 100 / rowCount + '%'

module.exports = (rowCount, colCount, domView) ->
  updateTexts domView
  updateMainElement domView
  updateTileSize rowCount, colCount
  initialResize rowCount, colCount
  window.onresize = throttledResize rowCount, colCount
  return

updateTexts$ = ({title, version, levelText}) ->
  document.title = title
  document.getElementById('version').textContent = version
  document.getElementById('level-text').textContent = levelText

updateMainElement$ = ({boardDiv}) ->
  document.querySelector('main').appendChild boardDiv

module.exports = ({
  BoardResizer: {initialResize$, throttledResize$}
  getDynamicStyle
}) ->

  updateTileSize$ = (rowCount, colCount) ->
    st = getDynamicStyle '.tile'
    st.width = 100 / colCount + '%'
    st.height = 100 / rowCount + '%'

  (rowCount, colCount, domView) ->
    updateTexts$ domView
    updateMainElement$ domView
    updateTileSize$ rowCount, colCount
    initialResize$ rowCount, colCount
    window.addEventListener 'resize', throttledResize$ rowCount, colCount
    return

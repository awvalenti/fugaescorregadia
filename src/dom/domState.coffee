makeBoard = ->
  ROWS = 20
  COLUMNS = 20

  ret = document.createElement 'div'
  ret.className = 'board'

  for r in [0...ROWS]
    for c in [0...COLUMNS]
      tile = document.createElement 'div'
      tile.className = 'tile'
      tile.classList.add (
        if Math.random() < 0.5 then 'obstacle'
        else 'protagonist'
      )
      ret.appendChild tile

  ret

module.exports = (i18n) ->
  title: i18n 'title'
  board: makeBoard()

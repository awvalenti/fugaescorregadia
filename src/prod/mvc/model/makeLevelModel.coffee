module.exports = (levelString) ->
  levelString
    .replace /\s+$/gm, ''
    .split '\n'
    .map (row) -> row.split(' ').map (tileChar) ->
      switch tileChar
        when '-' then 'EMPTY'
        when 'g' then 'GOAL'
        when 'o' then 'OBSTACLE'
        when 's' then 'START'
        else throw Error "'#{tileChar}' <-- invalid tileChar"

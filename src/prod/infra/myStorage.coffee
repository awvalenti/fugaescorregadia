module.exports = ({
  version
}) ->
  if version isnt localStorage.getItem 'version'
    console.warn 'Clearing localStorage and updating version'
    do localStorage.clear
    localStorage.setItem 'version', version

  set$: (name, value) ->
    localStorage.setItem name, value

  get$: (name) ->
    localStorage.getItem name

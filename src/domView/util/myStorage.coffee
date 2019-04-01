appVersion = require '/app/appVersion'

if appVersion isnt localStorage.getItem 'appVersion'
  console.warn 'Clearing localStorage and updating appVersion'
  do localStorage.clear
  localStorage.setItem 'appVersion', appVersion

module.exports =
  set: (name, value) ->
    localStorage.setItem name, value

  get: (name) ->
    localStorage.getItem name

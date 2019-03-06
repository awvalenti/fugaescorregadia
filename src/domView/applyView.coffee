module.exports = (domViewModel, controller) ->
  document.title = domViewModel.title

  document.body.appendChild domViewModel.boardDiv

  document.addEventListener 'keydown', controller.keydown
  document.addEventListener 'touchstart', controller.touchstart

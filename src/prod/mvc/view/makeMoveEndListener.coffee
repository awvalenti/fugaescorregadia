ADDITIONAL_DELAY = 20

module.exports = ->
  # moveEndListener is the function that will be called when the
  # player arrives at destination after each move, i.e.,
  # player transition/animation ends.
  #
  # We need to handle the transitionend event in order to process user
  # input and animations correctly. Browsers fire this event too soon,
  # when the animation hasn't really finished yet.
  #
  # That's why we add a small additional delay. That's what the setTimeout
  # below is about.
  #
  # moveEndListener.resolve is currently undefined, but will be set later
  # by the funciton that starts the animation. It will be set to a
  # resolve function of a Promise.
  ret = -> setTimeout ret.resolve, ADDITIONAL_DELAY

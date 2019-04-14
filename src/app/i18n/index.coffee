lang = navigator?.language?.substring 0, 2

# We can't generate paths dynamically: require is handled correctly
# by build process only when paths are compile-time literal strings.
# Lazy-loading like the following is the best we can do.
loader =
  en: -> require './langs/en'
  pt: -> require './langs/pt'

strings = do loader[if lang of loader then lang else 'en']

module.exports = (key) -> strings[key]

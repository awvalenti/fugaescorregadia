module.exports = (lang) ->
  # We can't generate paths dynamically: require is handled correctly
  # by build process only when paths are compile-time literal strings.
  # Lazy-loading like the following is the best we can do.
  strings = {
    en: -> require '/i18n/langs/en'
    pt: -> require '/i18n/langs/pt'
  }[lang]()

  (key) -> strings[key]

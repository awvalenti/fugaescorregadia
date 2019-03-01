STRINGS =
  en: require '/i18n/langs/en'
  pt: require '/i18n/langs/pt'

module.exports = (lang) -> (key) -> STRINGS[lang][key]

i18n = (require '/i18n') 'en'

domState = (require '/dom/domState') i18n

document.title = domState.title

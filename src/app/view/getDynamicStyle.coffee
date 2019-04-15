dynamicStylesheetRules = document.styleSheets[1].cssRules

findRule = (selector) ->
  for rule in dynamicStylesheetRules
    return rule if rule.selectorText is selector
  throw Error "#{selector} selector not found in CSS"

module.exports = (selector) ->
  findRule(selector).style

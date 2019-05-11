dynamicStyleSheetRules = do () ->
  for sheet in document.styleSheets
    return sheet.cssRules if sheet.ownerNode.id is 'dynamic-stylesheet'

findRule = (selector) ->
  for rule in dynamicStyleSheetRules
    return rule if rule.selectorText is selector
  throw Error "#{selector} selector not found in CSS"

module.exports = (selector) ->
  findRule(selector).style

module.exports = (selector) ->
  (do () ->
      for rule in document.styleSheets[0].cssRules
        return rule if rule.selectorText is selector
      throw Error "#{selector} selector not found in CSS"
    ).style

define([
],
function(
) {

  function assert(condition, messageOrVarargs) {
    if (!condition) {
      var finalMessage = messageOrVarargs;

      for (var i = 2; i < arguments.length; ++i) {
        finalMessage += ' ';
        finalMessage += arguments[i];
      }

      throw Error(finalMessage);
    }
  };

  var VALID_TYPEOF_RESULTS = {
      'number': true,
      'string': true,
      'boolean': true,
      'object': true,
      'function': true,
      'undefined': true,
      'xml': true
  };

  assert.args = function assertArgs() {
    if (arguments.length % 2 !== 0) {
      throw Error('assert.args used incorrectly. Expected even number of arguments, got ' + arguments.length + '.');
    }

    var errorMessages = [];

    for (var i = 0; i < arguments.length; i += 2) {
      var argIndex = i / 2;
      var actualType = typeof arguments[i];
      var expectedType = arguments[i + 1];

      if (!VALID_TYPEOF_RESULTS.hasOwnProperty(expectedType)) {
        throw Error('assert.args used incorrectly. Expected a valid typeof result, got ' + expectedType + '. ' +
            'Valid results are: number, string, boolean, object, function, undefined, xml.');
      }

      if (actualType !== expectedType) errorMessages.push('Expected arg[' + argIndex + '] ' + expectedType + ', got ' + actualType + '.');
    }

    if (errorMessages.length > 0) throw Error(errorMessages.join(' '));
  };

  return assert;

});

define([
],
function(
) {

  function assert(condicao, mensagemOuVarargs) {
    if (!condicao) {
      var mensagemFinal = mensagemOuVarargs;

      for (var i = 2; i < arguments.length; ++i) {
        mensagemFinal += ' ';
        mensagemFinal += arguments[i];
      }

      throw Error(mensagemFinal);
    }
  };

  assert.args = function assertArgs() {
    var errorMessages = [];

    for (var i = 0; i < arguments.length; i += 2) {
      var argIndex = i / 2;
      var actualType = typeof arguments[i];
      var expectedType = arguments[i + 1];

      if (actualType !== expectedType) errorMessages.push('Expected arg[' + argIndex + '] ' + expectedType + ', got ' + actualType + '.');
    }

    if (errorMessages.length > 0) throw Error(errorMessages.join(' '));
  };

  return assert;

});

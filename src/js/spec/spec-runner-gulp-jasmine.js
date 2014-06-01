(function() {
  'use strict';

  var requirejs = obterRequireJsSemCache();

  configurarRequireJs(function() {
    requirejs('spec/preparar-specs');
  });

  function obterRequireJsSemCache() {
    // Queremos evitar que o RequireJS faca cache dos modulos, senao o
    // gulp autotest nao funciona. A maneira mais facil de conseguir isso
    // e' removendo o proprio RequireJS do cache do Node.
    delete require.cache[require.resolve('requirejs')];
    return require('requirejs');
  }

  function configurarRequireJs(aoTerminar) {
    requirejs.config({ baseUrl: 'src/js' });
    requirejs('prod/config/require-js-configuracoes-globais');
    aoTerminar();
  }

})();

(function() {
  'use strict';

  requirejs.config({ baseUrl: '../js' });
  requirejs(['prod/config/require-js-configuracoes-globais'], function() {
    requirejs(['prod/aplicacao/ponto-de-entrada/iniciar-jogo']);
  });

})();

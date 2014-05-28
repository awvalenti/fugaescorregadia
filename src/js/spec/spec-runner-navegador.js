(function() {
  'use strict';

  configurarRequireJs(function() {
    carregarJasmine(function() {
      carregarListaArquivosSpecs(carregarEExecutarSpecs);
    });
  });

  function configurarRequireJs(aoTerminar) {
    requirejs.config({ baseUrl: '../js' });
    requirejs(['prod/config/require-js-configuracoes-globais'], aoTerminar);
  }

  function carregarJasmine(aoTerminar) {
    requirejs(['lib/non-amd/jasmine-1.3.1/jasmine'], function() {
      requirejs(['lib/non-amd/jasmine-1.3.1/jasmine-html'], aoTerminar);
    });
  }

  function carregarListaArquivosSpecs(aoTerminar) {
    requirejs(['spec/listaArquivosSpecs'], aoTerminar);
  }

  function carregarEExecutarSpecs(listaArquivosSpecs) {
    requirejs(listaArquivosSpecs, executarJasmine);
  }

  function executarJasmine() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
  }

})();

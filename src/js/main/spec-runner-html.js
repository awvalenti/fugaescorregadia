(function() {
  'use strict';

  configurarRequireJs();
  carregarJasmine(function() {
    carregarListaArquivosSpecs(function(listaArquivosSpecs) {
      requirejs(listaArquivosSpecs, executarJasmine);
    });
  });

  function configurarRequireJs() {
    requirejs.config({
      baseUrl: '../js',
      shim: {
        'lib/non-amd/underscore': { init: function() { return _.noConflict(); } }
      }
    });
  }

  function carregarJasmine(aoTerminar) {
    requirejs(['lib/non-amd/jasmine-1.3.1/jasmine'], function() {
      requirejs(['lib/non-amd/jasmine-1.3.1/jasmine-html'], function() {
        aoTerminar();
      });
    });
  }

  function carregarListaArquivosSpecs(aoTerminar) {
    requirejs(['spec/listaArquivosSpecs'], aoTerminar);
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

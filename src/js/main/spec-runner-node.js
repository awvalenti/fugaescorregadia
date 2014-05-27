(function() {
  'use strict';

  tirarRequireJsDoCacheDoNode();
  var requirejs = require('requirejs');
  configurarRequireJs();
  executarJasmine();

  function tirarRequireJsDoCacheDoNode() {
    // Isso evita cache dos arquivos .js ao fazer gulp watch
    delete require.cache[require.resolve('requirejs')];
  }

  function configurarRequireJs() {
    requirejs.config({
      baseUrl: 'src/js',
      shim: {
        'lib/non-amd/underscore': { init: function() { return _.noConflict(); } }
      }
    });
  }

  function executarJasmine() {
    requirejs('spec/listaArquivosSpecs').forEach(requirejs);
  }

})();

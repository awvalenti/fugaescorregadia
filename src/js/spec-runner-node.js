(function() {
  'use strict';

  // Evita que o RequireJS faca cache, para gulp-watch funcionar corretamente
  delete require.cache[require.resolve('requirejs')];

  var requirejs = require('requirejs');

  requirejs.config({
    baseUrl: 'src/js',
    shim: {
      'lib/non-amd/underscore': { init: function() { return _.noConflict(); } }
    }
  });

  requirejs('spec/listaArquivosSpecs').forEach(requirejs);

})();

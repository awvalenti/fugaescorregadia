(function() {
  'use strict';

  requirejs.config({
    baseUrl: '../js',
    shim: {
      'lib/non-amd/underscore': { init: function() { return _.noConflict(); } }
    }
  });

  requirejs(['lib/non-amd/jasmine-1.3.1/jasmine'], function() {
  requirejs(['lib/non-amd/jasmine-1.3.1/jasmine-html'], function() {
  requirejs(['spec/listaArquivosSpecs'], function(listaArquivosSpecs) {
  requirejs(listaArquivosSpecs, function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
  });
  });
  });
  });

})();

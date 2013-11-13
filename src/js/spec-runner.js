'use strict';

requirejs(['lib/non-amd/jasmine-1.3.1/jasmine'], function() {
requirejs(['lib/non-amd/jasmine-1.3.1/jasmine-html'], function() {

requirejs([
  'spec/assertSpec',
  'spec/PosicaoSpec',
  'spec/MovimentacaoSpec',
],
function() {
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

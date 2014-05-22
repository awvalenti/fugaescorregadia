var requirejs = require('requirejs');

requirejs.config({
  baseUrl: 'src/js',
  shim: {
    'lib/non-amd/underscore': { init: function() { return _.noConflict(); } }
  }
});

var specs = [
  'spec/assertSpec',
  'spec/enumerateBasicUsageSpec',
  'spec/enumerateConstructorsSpec',
  'spec/enumerateInstancePropertiesSpec',
  'spec/enumerateStaticPropertiesSpec',
  'spec/CompiladorMapaSpec',
  'spec/ElementoSpec',
  'spec/MapaViewModoTextoSpec',
  'spec/MovimentacaoSpec',
  'spec/PosicaoSpec',
  'spec/RepoPosicoesSpec',
  'spec/TabuleiroSpec',
  'spec/spec-helper/DirecaoMatcherSpec',
];

for (var i in specs) requirejs(specs[i]);

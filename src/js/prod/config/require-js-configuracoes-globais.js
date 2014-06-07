define(function() {
  requirejs.config({
    map: {
      '*': {
        '$': 'lib/amd/$',
        '_': 'lib/amd/underscore-amd'
      }
    }
  });
});

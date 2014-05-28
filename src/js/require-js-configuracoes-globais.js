define(function() {
  requirejs.config({
    map: {
      '*': {
        '$': 'lib/amd/jquery-amd',
        '_': 'lib/amd/underscore-amd'
      }
    }
  });
});

(function() {
  'use strict';

  if (typeof global !== 'undefined') {
    define(function() { return require('cheerio').load('<html><body></body></html>'); });

  } else {
    define(['lib/non-amd/jquery-2.1.1'], function() { return $.noConflict(true); });
  }

})();

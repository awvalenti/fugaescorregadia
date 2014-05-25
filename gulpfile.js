(function() {
  'use strict';

  var gulp = require('gulp');
  var watch = require('gulp-watch');
  var jasmine = require('gulp-jasmine');
  var growl = require('growl');

  gulp.task('test', function() {
    gulp.src('src/js/main/spec-runner-node.js')
        .pipe(jasmine({ includeStackTrace: false }));
  });

  gulp.task('watch', function() {
    gulp.run('test');
    gulp.watch('src/js/**/*.js', function(event) {
      gulp.run('test');
    });
  });

})();

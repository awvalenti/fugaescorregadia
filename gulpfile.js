(function() {
  'use strict';

  var gulp = require('gulp');
  var watch = require('gulp-watch');
  var jasmine = require('gulp-jasmine');

  gulp.task('test', function() {
    gulp.src('src/js/spec/spec-runner-gulp-jasmine.js')
        .pipe(jasmine({ includeStackTrace: false }));
  });

  gulp.task('autotest', ['test'], function() {
    gulp.watch('src/js/**/*.js', ['test']);
  });

  gulp.task('default', ['autotest']);

})();

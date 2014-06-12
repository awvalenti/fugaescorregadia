(function() {
  'use strict';

  var gulp = require('gulp');
  var jasmine = require('gulp-jasmine');
  var _ = require('underscore')._;

  gulp.task('test', _(function() {
    gulp.src('src/js/spec/spec-runner-gulp-jasmine.js')
        .pipe(jasmine());
  }).throttle(10, { leading: false }));

  gulp.task('autotest', ['test'], function() {
    gulp.watch('src/js/**/*.js', ['test']);
  });

  gulp.task('default', ['autotest']);

})();

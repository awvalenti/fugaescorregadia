var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var jasmine = require('gulp-jasmine');

gulp.task('test', function() {
  gulp.src('src/js/spec-runner-node.js')
      .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', function(event) {
    gulp.run('test');
  });
});

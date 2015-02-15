var gulp = require('gulp'),
connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: './app',
    port: 80,
    livereload: true
  });
});


// gulp.task('default', ['copy','ap','useref']);

gulp.task('watch', function() {
	gulp.watch("app/*", ['default']);
	gulp.watch("app/*/*", ['default']);
});
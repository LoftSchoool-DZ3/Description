var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var concatCss = require('gulp-concat-css');
var wiredep = require('wiredep').stream;

//bower wiredep
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});


gulp.task('default', ['copy','ap','useref']);


gulp.task('ap', function() {
    gulp.src('app/css/styles.css')
          .pipe(autoprefixer({
            browsers: ['last 20 versions']
        }))
        .pipe(gulp.dest('app/css/'));
var gulp = require('gulp'),
connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: './app',
    port: 80,
    livereload: true
  });
});

gulp.task('copy', function () {
    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

});

gulp.task('useref', function () {
    var assets = useref.assets();
    
    return gulp.src('app/index.html')
            .pipe(assets)
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['copy','ap','useref']);

gulp.task('watch', function() {
    gulp.watch("app/*", ['default']);
    gulp.watch("app/*/*", ['default']);
}

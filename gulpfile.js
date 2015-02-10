  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var gulpif = require('gulp-if');
  var rename = require("gulp-rename");
  var uglify = require('gulp-uglify');
  var useref = require('gulp-useref');

  gulp.task('default', function(){
    console.log('Hello from Gulp!')
  });
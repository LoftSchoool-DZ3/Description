var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var concatCss = require('gulp-concat-css');

gulp.task('default', ['ap','copy','useref']);


gulp.task('ap', function() {
	gulp.src('app/css/styles.css')
	  	.pipe(autoprefixer({
	        browsers: ['last 20 versions']
	    }))
	    .pipe(gulp.dest('app/css/'));
});

gulp.task('copy', function () {
    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img'));

});

gulp.task('useref', function () {
    var assets = useref.assets();
    
    return gulp.src('app/index.html')
	        .pipe(assets)
	        .pipe(assets.restore())
	        .pipe(useref())
	        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch("app/*", ['default']);
	gulp.watch("app/*/*", ['default']);
});
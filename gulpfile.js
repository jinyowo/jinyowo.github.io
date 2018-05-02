var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var rename = require('gulp-rename');

var paths = {
    js: 'src/js',
    scss: 'src/scss/*.scss',
    html: 'src/index.html'
};

gulp.task('minify-js', function () {
    return gulp.src([
        paths.js + '/util.js',
        paths.js + '/map.js',
        paths.js + '/sns.js',
        paths.js + '/main.js'
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('minify-css', function () {
    return gulp.src(paths.scss)
        .pipe(minifyCSS())
        .pipe(rename('jinyowo-theme-min.scss'))
        .pipe(gulp.dest('_sass'));
});

gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(rename('default.html'))
        .pipe(gulp.dest('_layouts'));
});

gulp.task('default', ['minify-js', 'minify-css', 'compress-html']);

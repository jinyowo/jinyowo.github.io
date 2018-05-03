var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var rename = require('gulp-rename');

var paths = {
    js: 'src/assets/js/*.js',
    css: 'src/assets/css/*.css',
    html: 'src/assets/index.html'
};

// gulp.task('minify-js', function () {
//     return gulp.src([
//         paths.js + '/util.js',
//         paths.js + '/map.js',
//         paths.js + '/sns.js',
//         paths.js + '/main.js'
//     ])
//         .pipe(concat('script.min.js'))
//         .pipe(uglify().on('error', gutil.log))
//         .pipe(gulp.dest('assets/js'));
// });
//
// gulp.task('minify-css', function () {
//     return gulp.src(paths.scss)
//         .pipe(minifyCSS())
//         .pipe(rename('jinyowo-theme-min.scss'))
//         .pipe(gulp.dest('_sass'));
// });
//
// gulp.task('compress-html', function () {
//     return gulp.src(paths.html)
//         .pipe(minifyhtml())
//         .pipe(rename('default.html'))
//         .pipe(gulp.dest('_layouts'));
// });

gulp.task('release-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('script.min.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('release-css', function () {
    return gulp.src(paths.css)
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('copy-img', function () {
    return gulp.src('src/assets/images/**/*.*')
        .pipe(gulp.dest('assets/images'))
});

gulp.task('copy-font', function () {
    return gulp.src('src/assets/fonts/*.*')
        .pipe(gulp.dest('assets/fonts'))
});

gulp.task('copy-js-lib', function () {
    return gulp.src('src/assets/js/lib/*.js')
        .pipe(gulp.dest('assets/js/lib'))
});

gulp.task('copy-css', function () {
    return gulp.src([
        'src/assets/css/**/*.*',
        '!src/assets/css/style.css'
    ])
        .pipe(gulp.dest('assets/css'))
});


// gulp.task('default', ['minify-js', 'minify-css', 'compress-html']);

gulp.task('copy', ['copy-js-lib', 'copy-css', 'copy-img', 'copy-font']);
gulp.task('release', ['release-js', 'release-css', 'copy']);

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cache = require('gulp-cache');
const image = require('gulp-image');

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch('src/*.html', ['html', 'build']);
    gulp.watch('src/styles/**/*.scss', ['sass', 'inject']);
    gulp.watch('src/scripts/**/*.js', ['js', 'inject']);
    gulp.watch('src/media/**/*.{png,jpeg,gif,svg}', ['image']);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'html', 'sass', 'js', 'inject', 'image', callback);
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(cache.clear())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('image', function() {
    return gulp.src('./src/media/**/*.{png,jpeg,gif,svg}')
        .pipe(image())
        .pipe(gulp.dest('./dist/media'));
})

gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(cache.clear())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(cache.clear())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('inject', function() {
    return gulp.src('./dist/*.html')
        .pipe(inject(gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

gulp.task('clean:html', function() {
    return gulp.src('./dist/**/*.html', {read: false})
        .pipe(clean());
})

gulp.task('default', ['serve']);
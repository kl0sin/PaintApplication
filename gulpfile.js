const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

gulp.task('serve', ['build'], function() {

        browserSync.init({
            server: "./dist"
        });

        gulp.watch("src/styles/**/*.scss", ['sass', 'inject']);
        gulp.watch("src/*.html", ['html', 'inject']);
});

gulp.task('build', function(callback) {
    runSequence(['clean', 'html', 'sass', 'inject'], function() {
        callback();
    });
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('inject', function() {
    gulp.src('./dist/*.html')
        .pipe(inject(gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false}), {relative: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('concat', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('clean', function() {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

gulp.task('default', ['serve']);
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
        browserSync.init({
            server: "./dist"
        });
        gulp.watch("src/styles/**/*.scss", ['sass']);
        gulp.watch("src/*.html", ['html']);
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/style'))
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

gulp.task('default', ['serve']);
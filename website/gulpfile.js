'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev-all');
// const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
// const uglify = require('gulp-uglify');

const mainSassFiles = [
  './assets/scss/main.scss',
];

const cssDist = './public/static/css';

gulp.task('sass-dev', function () {
  return gulp.src(mainSassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDist));
});

gulp.task('sass', function () {
  return gulp.src(mainSassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDist))
    // .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rev.revision())
    .pipe(gulp.dest(cssDist))
    .pipe(rev.manifestFile())
    // .pipe(sourcemaps.write())
    // .pipe(rename({ basename: config.css.main }))
    .pipe(gulp.dest(cssDist));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/*.scss', ['sass-dev']);
});


gulp.task('imagemin', () =>
  gulp.src('./assets/img/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/static/img/'))
);

gulp.task('img', ['imagemin']);

gulp.task('prod', ['sass', 'img']);
gulp.task('default', ['img', 'sass-dev', 'sass:watch']);

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    image = require('gulp-image'),
    rename = require('gulp-rename');

var path = {
  build: {
    css: './build/css',
    images: './build/images',
    fonts: './build/fonts'
  },
  src: {
    style: './src/style/**/*.scss',
    images: './src/images/**',
    fonts: './src/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  }
}

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('styles', function() {
  return gulp.src(path.src.style)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('image', function () {
  return gulp.src(path.src.images)
    .pipe(image())
    .pipe(gulp.dest(path.build.images));
});

gulp.task('fonts', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function () {
  browserSync.init({
    server: ""
  });

  gulp.watch(path.src.style, ['styles'])
      .on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type);
      });

  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'image', 'fonts']);
gulp.task('default', ['styles', 'image', 'fonts', 'watch']);

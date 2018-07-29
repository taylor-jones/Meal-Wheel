const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
    files: ['../app/**/*.*'],
    // browser: 'google chrome',
    port: 7000,
  });
});


gulp.task('nodemon', function(cb) {
  let started = false;

  return nodemon({
    script: './bin/www',
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

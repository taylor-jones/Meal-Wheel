const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
    files: ['../app/**/*.*'],
    port: 7000,
    notify: {
      styles: [
        'display: none; ',
        'padding: 6px 15px 3px;',
        'position: fixed;',
        'font-size: 0.8em;',
        'z-index: 9999;',
        'left: 0px;',
        'bottom: 0px;',
        'color: rgb(74, 74, 74);',
        'background-color: rgb(17, 17, 17);',
        'color: rgb(229, 229, 229);',
      ],
    },
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

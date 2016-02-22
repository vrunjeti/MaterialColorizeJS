var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

gulp.task('scripts', function() {
  browserify('src/scripts/main.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('watch', function() {
  gulp.watch('src/scripts/**/*.*', ['scripts']);
});

gulp.task('sync', function() {
  browserSync({
    server: '.'
  });
});

gulp.task('default', ['watch', 'scripts', 'sync']);


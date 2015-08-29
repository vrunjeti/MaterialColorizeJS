var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  browserify('js/index.js')
    .transform(babelify.configure({
      optional: ['es7.decorators']
    }))
    .bundle()
    .pipe(source('materialcolorize.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.*', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
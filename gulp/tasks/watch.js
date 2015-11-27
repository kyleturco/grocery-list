import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import paths from '../../paths';

const g = loadPlugins();

gulp.task('watch', cb => {
  gulp.watch(`${paths.src}/**/*.html`, ['build-html']);
  gulp.watch(`${paths.src}/**/*.less`, ['build-less']);
  gulp.watch(`${paths.src}/**/*.js`, ['build-js']);
  cb();
});

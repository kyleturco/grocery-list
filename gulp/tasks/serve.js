import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import paths from '../../paths';

const g = loadPlugins();

gulp.task('serve', cb => {
  return gulp.src(paths.dist)
    .pipe(g.webserver({
      livereload: true,
      directoryListing: false,
      open: true,
    }));
});

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import paths from '../../paths';
import runSequence from 'run-sequence';

const g = loadPlugins();

gulp.task('default', cb => {
  runSequence(
    'build',
    'serve',
    'watch',
    cb
  );
});

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import paths from '../../paths';
import runSequence from 'run-sequence';
import del from 'del';

const g = loadPlugins();

gulp.task('build', cb => {
  runSequence(
    'clean-build',
    [
      'build-html',
      'build-less',
      'build-js',
    ],
    cb
  );
});

gulp.task('build-html', cb => {
  return gulp.src(`${paths.src}/**/*.html`)
    .pipe(g.minifyHtml())
    .pipe(g.replace('CACHE_BUST_STRING', Date.now()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-less', cb => {
  return gulp.src(`${paths.src}/less/main.less`)
    .pipe(g.less())
    .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(g.minifyCss())
    .pipe(g.rename('main.min.css'))
    .pipe(gulp.dest(`${paths.dist}/css`));
});

gulp.task('build-js', cb => {
  return gulp.src([
    `${paths.src}/js/utils.js`,
    `${paths.src}/js/main.js`,
  ])
    .pipe(g.concat('main.js'))
    .pipe(gulp.dest(`${paths.dist}/js`))
    .pipe(g.uglify())
    .pipe(g.rename('main.min.js'))
    .pipe(gulp.dest(`${paths.dist}/js`));
});

gulp.task('clean-build', cb => {
  del.sync(paths.dist);
  cb();
});

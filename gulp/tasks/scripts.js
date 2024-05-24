import browserSync from 'browser-sync';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import terser from 'gulp-terser';

import webpackConfig from '../../webpack.config.js';

const plumberOptions = {
  errorHandler: notify.onError({
    title: 'JS',
    message: 'Error: <%= error.message %>',
  }),
};

const scripts = () => {
  return app.gulp
    .src(app.paths.src.scripts)
    .pipe(plumber(plumberOptions))
    .pipe(webpackStream(webpackConfig(app)))
    .on('error', (err) => {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(gulpIf(app.isProd, terser()))
    .pipe(app.gulp.dest(app.paths.build.scripts))
    .pipe(browserSync.stream());
};

export { scripts };

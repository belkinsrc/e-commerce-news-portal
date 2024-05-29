import webpackConfig from '../../webpack.config.js';

const scripts = () => {
  return app.gulp
    .src(app.paths.src.scripts)
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.webpackStream(webpackConfig(app)))
    .on('error', (err) => {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(app.plugins.gulpIf(app.isProd, app.plugins.terser()))
    .pipe(app.gulp.dest(app.paths.build.scripts))
    .pipe(app.plugins.browserSync.stream());
};

export { scripts };

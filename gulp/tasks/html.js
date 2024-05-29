const html = () => {
  return app.gulp
    .src(app.paths.src.html)
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(
      app.plugins.fileInclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(app.plugins.replace(/@image\//g, 'images/'))
    .pipe(
      app.plugins.gulpIf(
        app.isProd,
        app.plugins.htmlmin({ collapseWhitespace: true })
      )
    )
    .pipe(app.plugins.typograf({ locale: ['ru', 'en-US'] }))
    .pipe(app.gulp.dest(app.paths.build.html))
    .pipe(app.plugins.browserSync.stream());
};

export { html };

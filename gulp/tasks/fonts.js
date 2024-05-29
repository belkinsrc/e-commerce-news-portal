const fonts = () => {
  return app.gulp
    .src(app.paths.src.fonts, { encoding: false })
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'Images',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.newer(app.paths.build.fonts))
    .pipe(app.plugins.flatten())
    .pipe(app.gulp.dest(app.paths.build.fonts))
    .pipe(app.plugins.browserSync.stream());
};

export { fonts };

const svg = () => {
  return app.gulp
    .src(app.paths.src.svg)
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.newer(app.paths.build.svg))
    .pipe(app.plugins.flatten())
    .pipe(app.gulp.dest(app.paths.build.svg));
};

export { svg };

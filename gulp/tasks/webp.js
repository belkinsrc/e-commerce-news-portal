const webpImages = () => {
  return app.gulp
    .src(app.paths.src.images, { encoding: false })
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'WEBP',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.newer(app.paths.build.images))
    .pipe(app.plugins.webp())
    .pipe(app.plugins.flatten())
    .pipe(app.gulp.dest(app.paths.build.images));
};

export { webpImages };

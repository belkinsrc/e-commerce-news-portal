import path from 'path';

const rootFolder = path.basename(path.resolve());

const zipFiles = () => {
  app.plugins.deleteAsync(`${app.paths.base.build}/*.zip`);
  return app.gulp
    .src(`${app.paths.base.build}/**/*.*`, { encoding: false })
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.zip(`${rootFolder}.zip`))
    .pipe(app.gulp.dest(app.paths.base.build));
};

export { zipFiles };

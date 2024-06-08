const data = () => {
  return app.gulp
    .src(app.paths.src.data)
    .pipe(app.gulp.dest(app.paths.build.data));
};

export { data };
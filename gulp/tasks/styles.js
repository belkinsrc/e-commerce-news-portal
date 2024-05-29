import * as dartSass from 'sass';

const styles = () => {
  const sass = app.plugins.gulpSass(dartSass);

  return app.gulp
    .src(app.paths.src.styles)
    .pipe(
      app.plugins.plumber({
        errorHandler: app.plugins.notify.onError({
          title: 'CSS',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(app.plugins.gulpIf(!app.isProd, app.plugins.sourcemaps.init()))
    .pipe(sass())
    .pipe(
      app.plugins.autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ['last 5 versions'],
      })
    )
    .pipe(
      app.plugins.gulpIf(
        app.isProd,
        app.plugins.cleanCSS({
          level: 2,
        })
      )
    )
    .pipe(app.plugins.replace(/@image\//g, 'images/'))
    .pipe(app.plugins.gulpIf(!app.isProd, app.plugins.sourcemaps.write('.')))
    .pipe(app.gulp.dest(app.paths.build.styles))
    .pipe(app.plugins.browserSync.stream());
};

export { styles };

import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

const plumberOptions = {
  errorHandler: notify.onError({
    title: 'CSS',
    message: 'Error: <%= error.message %>',
  }),
};

const styles = () => {
  return app.gulp
    .src(app.paths.src.styles, { sourcemaps: !app.isProd })
    .pipe(plumber(plumberOptions))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpIf(app.isProd, cleanCSS({
      level: 2
    })))
    .pipe(app.gulp.dest(app.paths.build.styles))
    .pipe(browserSync.stream());
};

export { styles };

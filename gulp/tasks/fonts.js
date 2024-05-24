import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import flatten from 'gulp-flatten';

const plumberOptions = {
  errorHandler: notify.onError({
    title: 'Images',
    message: 'Error: <%= error.message %>',
  }),
};

const fonts = () => {
  return app.gulp
    .src(app.paths.src.fonts, { encoding: false })
    .pipe(plumber(plumberOptions))
    .pipe(newer(app.paths.build.fonts))
    .pipe(flatten())
    .pipe(app.gulp.dest(app.paths.build.fonts))
    .pipe(browserSync.stream());
};

export { fonts };
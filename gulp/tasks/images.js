import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import flatten from 'gulp-flatten';
import gulpIf from 'gulp-if';

const plumberOptions = {
  errorHandler: notify.onError({
    title: 'Images',
    message: 'Error: <%= error.message %>',
  }),
};

const imageminOptions = {
  optimizationLevel: 5,
  progressive: true,
  interlaced: true,
};

const images = () => {
  return app.gulp
    .src(app.paths.src.images, { encoding: false })
    .pipe(plumber(plumberOptions))
    .pipe(newer(app.paths.build.images))
    .pipe(gulpIf(app.isProd, imagemin(imageminOptions)))
    .pipe(flatten())
    .pipe(app.gulp.dest(app.paths.build.images));
};

export { images };

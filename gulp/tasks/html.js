import browserSync from 'browser-sync';
import fileInclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';

const fileIncludeOptions = {
  prefix: '@',
  basepath: '@file',
};

const html = () => {
  return app.gulp.src(app.paths.src.html)
    .pipe(fileInclude(fileIncludeOptions))
    .pipe(gulpIf(app.isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(app.gulp.dest(app.paths.build.html))
    .pipe(browserSync.stream());
}

export { html };
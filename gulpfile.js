import gulp from 'gulp';
import browserSync from 'browser-sync';

import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { scripts } from './gulp/tasks/scripts.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';

global.app = {
  gulp,
  paths,
  isProd: process.argv.includes('--build'),
};

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`,
    },
    notify: false,
    port: 3000,
  });

  gulp.watch(`${app.paths.base.src}/**/*.html`, html);
  gulp.watch(`${app.paths.base.src}/**/*.scss`, styles);
  gulp.watch(`${app.paths.base.src}/**/*.js`, scripts);
  gulp.watch(`${app.paths.base.src}/**/.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.base.src}/**/.{woff,woff2,ttf,otf,eot}`, fonts);
};

const dev = gulp.series(
  clean,
  gulp.parallel(html, scripts, styles, images, fonts),
  watcher
);

gulp.task('default', dev);

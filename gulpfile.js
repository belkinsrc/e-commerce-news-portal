import gulp from 'gulp';
import browserSync from 'browser-sync';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { scripts } from './gulp/tasks/scripts.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { webpImages } from './gulp/tasks/webp.js';
import { svg } from './gulp/tasks/svg.js';
import { fonts } from './gulp/tasks/fonts.js';
import { zipFiles } from './gulp/tasks/zip.js';

import { paths } from './gulp/config/paths.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
  gulp,
  paths,
  plugins,
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
  gulp.watch(`${app.paths.base.src}/**/*.{jpg,jpeg,png}`, gulp.parallel(images, webpImages));
  gulp.watch(`${app.paths.base.src}/**/*.svg`, svg);
  gulp.watch(`${app.paths.base.src}/**/*.{woff,woff2,ttf,otf,eot}`, fonts);
};

const dev = gulp.series(
  clean,
  gulp.parallel(html, scripts, styles, images, webpImages, svg, fonts),
  watcher
);
const zip = zipFiles;

export { dev };
export { zip };

gulp.task('default', dev);

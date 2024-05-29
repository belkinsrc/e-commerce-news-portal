// Server
import browserSync from 'browser-sync';

// Error processing
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

// HTML
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import typograf from 'gulp-typograf';

// Styles
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

// Scripts
import webpackStream from 'webpack-stream';
import terser from 'gulp-terser';

// Images
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';

// Others
import { deleteAsync } from 'del';
import sourcemaps from 'gulp-sourcemaps';
import flatten from 'gulp-flatten';
import newer from 'gulp-newer';
import replace from 'gulp-replace';
import gulpIf from 'gulp-if';
import zip from 'gulp-zip';

const plugins = {
  // Server
  browserSync,

  // Error processing
  plumber,
  notify,

  // HTML
  fileInclude,
  htmlmin,
  typograf,

  // Styles
  gulpSass,
  autoprefixer,
  cleanCSS,

  // Scripts
  webpackStream,
  terser,

  // Images
  imagemin,
  webp,

  // Others
  deleteAsync,
  sourcemaps,
  flatten,
  newer,
  replace,
  gulpIf,
  zip,
};

export { plugins };
const srcFolder = './src';
const buildFolder = './build';

export const paths = {
  base: {
    build: buildFolder,
    src: srcFolder,
  },
  build: {
    html: buildFolder,
    styles: `${buildFolder}/css`,
    scripts: `${buildFolder}/js`,
    images: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    styles: `${srcFolder}/styles/*.scss`,
    scripts: `${srcFolder}/scripts/*.js`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg}`,
    fonts: `${srcFolder}/**/*.{woff,woff2,ttf,otf,eot}`
  },
};

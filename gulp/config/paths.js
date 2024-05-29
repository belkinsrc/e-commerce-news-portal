const srcFolder = './src';
const buildFolder = './dist';

export const paths = {
  base: {
    build: buildFolder,
    src: srcFolder,
  },
  build: {
    html: buildFolder,
    styles: `${buildFolder}/css`,
    scripts: `${buildFolder}/js`,
    images: `${buildFolder}/images`,
    svg: `${buildFolder}/images/svg`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    html: `${srcFolder}/views/*.html`,
    styles: `${srcFolder}/styles/*.scss`,
    scripts: `${srcFolder}/scripts/*.js`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png}`,
    svg: `${srcFolder}/**/*.svg`,
    fonts: `${srcFolder}/**/*.{woff,woff2,ttf,otf,eot}`
  },
};

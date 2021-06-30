const compress_images = require('compress-images');
const Jimp = require('jimp');
const resizeOptimizeImages = require('resize-optimize-images');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

fs.readdir('/Users/sandordeli/Desktop/png-to-jpg/', (err: any, files: string[]) => {
  files = files.filter((file) => file.includes('.png'));
  files.forEach((file: any) => {
    convert(file);
  });
});
function convert(file: any) {
  Jimp.read(`/Users/sandordeli/Desktop/png-to-jpg/${file}`, async (err: any, image: any) => {
    if (err) {
      console.log(err);
      return;
    }

    const fileName = `${file.replace(/\.[^/.]+$/, '')}.jpg`;
    console.log(fileName);
    image.resize(350, Jimp.AUTO);
    image.write(`/Users/sandordeli/Desktop/png-to-jpg/jpg/${fileName}`);

    // const options = {
    //   images: [`/Users/sandordeli/Desktop/png-to-jpg-2/jpg/${fileName}`],
    //   width: 305,
    //   quality: 100,
    // };
    // await resizeOptimizeImages(options);
    gulp.src(`/Users/sandordeli/Desktop/png-to-jpg/jpg/${fileName}`).pipe(imagemin()).pipe(gulp.dest('/Users/sandordeli/Desktop/png-to-jpg/jpg'));
  });
}

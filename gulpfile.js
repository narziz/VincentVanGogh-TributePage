const { watch, series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

function sassToCss(done){
  return src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('dist/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
};

function imageMinify(){
  return src('src/img/*.+(png|jpg|jpeg|svg|gif)')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
};

function copyFont(){
  return src('src/font/*')
        .pipe(dest('dist/font'))
};

function watchTasks(){

  browserSync.init({
        server: "./",
        notify: false
    });

  watch('src/scss/*.scss', series('sass'));
  watch(['./*.html', 'dist/*.css']).on('change', browserSync.reload);
};

exports.sass = sassToCss;
exports.default = series(sassToCss, imageMinify, copyFont, watchTasks);

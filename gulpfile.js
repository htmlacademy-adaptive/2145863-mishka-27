import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh'; 
// пакет gulp-libsquoosh заменен на gulp-squoosh (проблема с avif на windows, давно не обновляется)
// https://github.com/GoogleChromeLabs/squoosh/issues/1119
import squooshCreate from 'gulp-squoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    // не дает js упасть при ошибке в стилях (нет нужды запускать каждый раз npm start)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))    
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream())
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const createImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(squooshCreate({
      encodeOptions: {
        webp: {},
        avif: {},
      }
    }))
    .pipe(gulp.dest('build/img'))
}

// Copy images

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/sprite-icons/*'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

// SVG Sprite

const sprite = () => {
  return gulp.src('source/img/sprite-icons/**/*.svg')
    .pipe(svgo())  
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean build

const clean = () => {
  return del('build')
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
      // baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  gulp.parallel(
    copy,
    optimizeImages,
    createImages,
    styles,
    html,
    scripts,
    svg,
    sprite
  )
);

export default gulp.series(
  clean,
  gulp.parallel(
    copy,
    // оптимизация и создание webp и avif реализовано в build (операция занимает около минуты)
    copyImages,
    styles,
    html,
    scripts,
    svg,
    sprite
  ),
  gulp.series(
    server,
    watcher
  )
);

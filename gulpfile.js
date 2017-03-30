const cp = require('child_process')
const os = require('os')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const cssnano = require('gulp-cssnano')
const gulp = require('gulp')
const jimp = require('gulp-jimp')
const parallel = require('concurrent-transform')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', done => {
  browserSync.notify(messages.jekyllBuild)
  return cp.spawn('jekyll.bat', ['build', '--config=_config.yml'], {stdio: 'inherit'})
        .on('close', done)
})

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['styles', 'jekyll-build'], () => {
  browserSync.init({
    server: {
      baseDir: '_site'
    },
    startPath: '/index.html'
  })
})

/**
 * Compile files from sass into both assets/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('styles', () => {
  return gulp.src('_scss/main.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'Firefox ESR',
        'safari 5',
        'ie 9',
        'opera 12.1'
      ]
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'))
})

/**
 * Automatically resize post feature images and turn them into thumbnails
 */
gulp.task('thumbnails', () => {
  gulp.src('assets/images/hero/*.{jpg,png}')
    .pipe(parallel(
      jimp({
        '': {
          resize: {width: 350}
        }
      }),
      os.cpus().length
    ))
    .pipe(gulp.dest('assets/images/thumbnail'))
})

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll
 * Watch _site generation, reload BrowserSync
 */
gulp.task('watch', () => {
  gulp.watch('_scss/**/*.scss', ['styles'])
  gulp.watch('assets/images/hero/*.{jpg,png}', ['thumbnails'])
  gulp.watch([
    '*.html',
    '*.txt',
    'about/**',
    '_posts/*.md',
    'assets/javascripts/**/**.js',
    'assets/images/**',
    'assets/fonts/**',
    '_layouts/**',
    '_includes/**',
    'assets/css/**'
  ], ['jekyll-build'])
  gulp.watch('_site/index.html').on('change', browserSync.reload)
})

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['thumbnails', 'browser-sync', 'watch'])

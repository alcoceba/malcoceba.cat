/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
const gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  inject = require('gulp-inject'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del');

// Default task clean && build
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

// Build
gulp.task('build', ['statics', 'styles', 'libs', 'scripts'], function() {
  gulp.start('inject');
});

// Copy HTML and other static files
gulp.task('statics', function() {
  return gulp.src(['src/**/*.html', 'src/**/*.ico'])
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'Static task complete'
    }));
});

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', {
      style: 'expanded'
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

// Scripts
gulp.task('libs', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({
      message: 'Libs task complete'
    }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

// Inject files into HTML
gulp.task('inject', function() {
  gulp.src('dist/**/*.html')
    .pipe(inject(gulp.src('dist/**/*.js', {
      read: false
    }), {
      relative: true
    }))
    .pipe(inject(gulp.src('dist/**/*.css', {
      read: false
    }), {
      relative: true
    }))
    .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['default'], function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch html files
  gulp.watch('src/**/*.html', ['statics']);

  // Create LiveReload server
  livereload.listen({start: true});

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

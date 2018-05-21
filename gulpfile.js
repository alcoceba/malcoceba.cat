// Load plugins
const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin');

const sourceAssets = [
    'src/**/*.ico',
    'src/assets/**/*'
];

const sourceScss = [
    'src/styles/main.scss'
];

const internalScripts = [
    'src/scripts/**/*.js'
];

const externalScripts = [
//    'node_modules/jquery/dist/jquery.min.js'
];

// Build
gulp.task('default', ['clean'], function() {
  gulp.start('compile');
});

// Compile
gulp.task('compile', [
    'assets',
    'styles',
    'scripts',
    'scripts-external',
    'minify-html'
]);

// Watch
gulp.task('watch', ['default'], function () {

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch html files
    gulp.watch('src/**/*.html', ['minify-html']);

    // Create LiveReload server
    livereload.listen({start: true});

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

// Copy HTML and other static files
gulp.task('assets', function () {
    return gulp.src(sourceAssets, {base: './src/'})
        .pipe(gulp.dest('dist'));
});

// Minify html
gulp.task('minify-html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Styles
gulp.task('styles', function () {
    return sass(sourceScss, {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(internalScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

// Scripts (external)
gulp.task('scripts-external', function () {
    return gulp.src(externalScripts)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/scripts'));
});

// Clean all
gulp.task('clean', function () {
    return del(['dist', 'dist/*']);
});
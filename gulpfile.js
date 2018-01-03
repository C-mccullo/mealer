const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

gulp.task('styles', () => {
    // stored in array incase more postcss plugins desired
    const processors = [
        autoprefixer
    ]
    return gulp.src('./client/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
    return browserify('client/scripts/index.js', {debug: true})
        .transform('babelify', {
            sourceMaps: true,
            presets: ['es2015','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('default', ['js','styles'], () => {
	gulp.watch('client/**/*.js',['js']);
	gulp.watch('client/**/*.scss',['styles']);
});

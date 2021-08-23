var browserSync = require('browser-sync').create(),
	cssPrefix = require('gulp-css-prefix'),
	gulp = require('gulp'),
	order = require('gulp-order'),
	concat = require('gulp-concat'),
	gutil = require('gulp-util'),
	notify = require("gulp-notify"),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	pleeease = require('gulp-pleeease'),
	pleeeaseOptions = {
		autoprefixer: {
			browsers: ['last 2 versions', 'ie 11'],
			cascade: false
		},
		filters: {
			oldIE: false
		},
		import: true,
		minifier: {
			removeAllComments: true
		},
		mqpacker: false,
		opacity: false,
		pseudoElements: true,
		rebaseUrls: false,
		rem: false,
		sourcemaps: false
	},
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

// Error Reporting
var reportError = function (error) {
	var lineNumber = (error.line) ? 'Line: ' + error.line + ' -- ' : '';

	notify({
		title: 'Task Failed [' + error.plugin + ']',
		message: lineNumber + ' See console.',
		sound: 'Sosumi'
	}).write(error);

	gutil.beep(); // Beep 'sosumi' again

	// Pretty error reporting
	var chalk = gutil.colors.white.bgRed,
		report = '';
	report += '\n\n' + chalk('TASK:') + ' [' + error.plugin + ']\n';
	report += '\n' + chalk('ISSUE:') + ' ' + error.message + '\n';
	if (error.line) {
		report += chalk('LINE:') + ' ' + error.line + '\n';
	}
	if (error.file) {
		report += '\n' + chalk('FILE:') + ' ' + error.file + '\n';
	}
	console.error(report);

	this.emit('end'); // Prevent the 'watch' task from stopping
}

// Compile sass task
gulp.task('styles', function () {
	gulp.src('assets/*.scss')
		.pipe(plumber({
			errorHandler: reportError
		}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(pleeease(pleeeaseOptions))
		.pipe(gulp.dest('assets/'))
		.pipe(browserSync.stream());
});

// Default Task 
// - Run 'gulp' to INCLUDE SCSS sourcemaps for NEWS MODULE
// - Run 'gulp --production' to EXCLUDE SCSS sourcemaps NEWS MODULE
gulp.task('default', ['live-browser', 'watch']);


gulp.task('live-browser', ['styles'], function () {
	browserSync.init({
		server: "./",
		startPath: "./index.html",
		directory: true
	});
});


gulp.task('watch', function () {
	gulp.watch('assets/*.scss', ['styles']);
	gulp.watch("assets/*.js").on('change', browserSync.reload);
	gulp.watch("./*.html").on('change', browserSync.reload);
});
var gulp         = require('gulp'),
	postcss 	 = require('gulp-postcss'),
	cssimport    = require('gulp-cssimport'),
	gulpShopify  = require('gulp-shopify-upload'),
    sass 		 = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    notify 		 = require('gulp-notify'),
    plumber 	 = require('gulp-plumber'),
    concat 		 = require('gulp-concat'),
    watch 	     = require('gulp-watch');

// Styles task
gulp.task('styles', function(){
  var processors = [
		autoprefixer({browsers:['last 2 version']})
	];
	return gulp.src( './styles/**/*.scss' )
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'uncompressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(concat( 'theme.css.liquid' ))
		.pipe(gulp.dest( './assets' ))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Watch files
gulp.task('watch', function () {
	gulp.watch( './styles/**/*.scss', ['styles'] );
});

// Shopify task
gulp.task('shopifywatch', function() {
	return watch('./+(assets|layout|config|snippets|templates|locales)/**')
		.pipe(gulpShopify('7c51310a08c438d2e26d85f733c21a1a', 'fb2ded40a5caa3e540c8de4adfabc718', 'devstore1234.myshopify.com'));
});

// Default task
gulp.task('default', ['watch', 'shopifywatch']);
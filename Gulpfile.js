var gulp         = require('gulp'),
	postcss 	 = require('gulp-postcss'),
	cssimport    = require('gulp-cssimport'),
	gulpShopify  = require('gulp-shopify-upload'),
    sass 		 = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    notify 		 = require('gulp-notify'),
    plumber 	 = require('gulp-plumber'),
    concat 		 = require('gulp-concat'),
    watch 	     = require('gulp-watch'),
    babel 		 = require('rollup-plugin-babel'),
    rollup 		 = require('gulp-better-rollup'),
    notify 		 = require('gulp-notify'),
    uglify 		 = require('gulp-uglify'),
    sourcemaps 	 = require('gulp-sourcemaps');

var config = {}

config.paths = {}

config.paths.src = {
	styles: './styles/**/*.scss',
	scripts: './scripts/*.js'
}

config.paths.dist = {
	styles: './assets',
	scripts: './assets'
}

// Styles task
gulp.task('styles', function(){
  var processors = [
		autoprefixer({browsers:['last 2 version']})
	];
	return gulp.src( config.paths.src.styles )
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'uncompressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(concat( 'theme.css.liquid' ))
		.pipe(gulp.dest( config.paths.dist.styles ))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts task
gulp.task('scripts', function() {
    return gulp.src([
	        config.paths.src.scripts
        ])
    	.pipe(rollup({
	    	plugins: [babel()]
	    }, {
			format: 'iife',
	    })).on('error', notify.onError(function (error) { return "Problem file -> " + error.message; }))
        .pipe(concat('shop.js.liquid'))
        //.pipe(uglify())
        .pipe(notify({ message: 'Scripts task complete' }))
        .pipe(gulp.dest( config.paths.dist.scripts ));
});

// Watch files
gulp.task('watch', function () {
	gulp.watch( config.paths.src.styles, ['styles'] );
	gulp.watch( config.paths.src.scripts, ['scripts'] );
});

// Shopify task
gulp.task('shopifywatch', function() {
	return watch('./+(assets|layout|config|snippets|templates|locales)/**')
		.pipe(gulpShopify('7c51310a08c438d2e26d85f733c21a1a', 'fb2ded40a5caa3e540c8de4adfabc718', 'devstore1234.myshopify.com'));
});

// Default task
gulp.task('default', ['watch', 'shopifywatch']);
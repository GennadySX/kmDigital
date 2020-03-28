var gulp 			= require('gulp'),
 	browserSync 	= require('browser-sync').create(),
 	watch 			= require("gulp-watch"),
 	sass 			= require('gulp-sass'),
 	concat			= require('gulp-concat'),
 	uglify 			= require('gulp-uglifyjs'),
 	cssnano 		= require('gulp-cssnano'),
 	rename			= require('gulp-rename'),
 	del 			= require('del'),
 	imagemin		= require('gulp-imagemin'),
 	pngquant		= require('imagemin-pngquant');
 	cache 	        = require('gulp-cache')
 	autoprefixer 	= require('gulp-autoprefixer');


/***SASS**/

gulp.task('sass', function() {								/*****/
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']),  { cascade: true })
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scss', function() {								/*****/
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']),  { cascade: true })
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}))
});



/***JS**/

gulp.task('scripts', function(){
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({stream:true}));
});

/***CSS_LIBS***/

gulp.task('css-libs', function() {
	return gulp.src('src/sass/**/*.+(sass | scss)')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});



gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "src"
			},
			notify: false
		});
	});

gulp.task('html', function() {
    return gulp.src('src/*.html')
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
    	return gulp.src('src/img/**/*')
    	  .pipe(cache(imagemin({
    	  	interlaced: true,
    	  	progressive: true,
    	  	svgoPlugins: [{removeViewBox: false}],
    	  	use: [pngquant()]
    	  	})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.sass', gulp.series('sass'));
	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/*.html',gulp.series('html'));
	gulp.watch('./src/js/*.js', gulp.parallel('scripts'));
});

gulp.task('clean',async function() {
    return del.sync('dist');
});

gulp.task('bcss', function() {
   return gulp.src([
		'src/css/*.css',
		'src/css/*.min.css'])
	  	.pipe(gulp.dest('dist/css'));
});

gulp.task('bfonts', function() {
   return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('bjs', function() {
   return gulp.src('src/js/**/*.js')
	  	.pipe(gulp.dest('dist/js'));
});

gulp.task('bhtml', function() {
   return gulp.src('src/*.html')
	  	.pipe(gulp.dest('dist'));
});



gulp.task('build', gulp.parallel('clean', 'img', 'sass', 'scripts','bcss','bjs','bfonts','bhtml'));

gulp.task('start', gulp.parallel('sass','scss' ,'browser-sync','scripts', 'watch'));


gulp.task('clear', function() {
	return cache.clearAll();
	});


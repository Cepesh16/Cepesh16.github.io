// подключаем модуль gulp
const 
	gulp			= require( 'gulp' ),
	sass			= require( 'gulp-sass' ),
	concat			= require( 'gulp-concat' ),
	autoprefixer	= require( 'gulp-autoprefixer'),
	cleanCSS 		= require( 'gulp-clean-css' ),
	uglify			= require( 'gulp-uglify' ),
	del				= require( 'del' ),
	browserSync		= require( 'browser-sync' ).create();

// создаем переменную где будем хранить пути


// для ВСЕХ файлов в папках
const 
	cssFiles = [
		'./src/css/**/*.css'
	],
	jsFiles = [
		'./src/js/**/*.js'
	];
// только main.scss куда импортируются все остальные .scss файлы
const scssFiles = './src/sass/main.scss';

function sassCompile () {
	// указываем откуда берем файлы
	return gulp.src( scssFiles )
	// компилируем в css
	.pipe( sass().on( 'error', sass.logError) )
	// папка для скомпилированных файлов
	.pipe( gulp.dest( './src/css/' ) )
	.pipe( browserSync.stream() );
}

// task для стилей
function styles() {
	// для gulp.src указываем в качестве путей массив файлов
	return gulp.src( cssFiles )
	// объединяем файлы в один
	.pipe( concat( 'style.css' ) )
	// добавляем автопрефиксы для новых, эксперементальных свойств css
	.pipe( autoprefixer({
		overrideBrowserslist: [
			"> 1%",
  		"last 2 versions",
  		// "not ie <= 8"
		],
		cascade: false
	}))
	// минификация css
	.pipe( cleanCSS({
		level: 2
	}))
	// папка назначения для стилей
	.pipe( gulp.dest( './build/css/' ) )
	.pipe( browserSync.stream() );
}

// task для скриптов
function scripts() {
	return gulp.src( jsFiles )
	.pipe( concat( 'script.js' ) )
	.pipe( uglify( {
		toplevel: true
	}) )
	.pipe( gulp.dest( './build/js/' ) )
	.pipe( browserSync.stream() );
}

// удаляем файлы в папке build
function clean() {
	return del( [ 'build/*']);
};

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // отслеживать изменения в css файлах
    gulp.watch( './src/scss/**/*.scss', sassCompile )
    gulp.watch( './src/css/**/*.css', styles ) /* две звездочки - внутри могут быть другие подпапки*/
    gulp.watch( './src/js/**/*.js', scripts )
    gulp.watch( './*.html' ).on(  'change', browserSync.reload );
}


// task вызывают функции объявленные выше
// в командной строке пишем: "gulp name" где 'name' это название task

// gulp.task( 'sass', sassCompile );
// gulp.task( 'styles', styles );
// gulp.task( 'scripts', scripts);
// gulp.task( 'clean', clean );
gulp.task( 'watch', watch );

gulp.task( 'build', gulp.series( clean, sassCompile, gulp.parallel( styles, scripts ) ) );
// series() - последовательно выполнять
// parallel() - параллельно выполнять

gulp.task( 'dev', gulp.series( 'build', 'watch' ) );


// чтобы остановить task нажать "CTRL + C"
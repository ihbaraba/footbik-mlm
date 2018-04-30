const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gcmq = require('gulp-group-css-media-queries'),
    rename = require("gulp-rename"),
    htmlImport = require('gulp-html-import');


let config = {
    app: './app',
    node_modules: './node_modules/',
    css: {
        src: '/scss/**/*.scss',
        dest: '/css',
        libs: '/libs.css',
        scss: '/scss',
        main_scss: '/main.scss'
    },
    html: {
        layouts: '/layouts/',
        src: '/src/*.html'
    },
    libs: '/libs/',
    js: {
        dest: '/js'
    },
    watcher:{
        src:'/src/*.html',
        import: '/layouts/*.html',
        js:'/js/*.js'
    }

};

gulp.task('js-libs', function () {
    return gulp.src([
        config.node_modules + 'jquery/dist/jquery.js',
        config.node_modules + 'bootstrap/dist/js/bootstrap.js'

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.app + config.js.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src(config.app + config.css.dest + config.css.libs)
        .pipe(gulp.dest(config.app + config.css.dest))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});


gulp.task('css-build', function () {
    gulp.src(config.app + config.css.scss + config.css.main_scss)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS({keepBreaks: false}))
        .pipe(sourcemaps.write('app/css', {addComment: true}))
        .pipe(gulp.dest(config.app + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('import', function () {
    gulp.src(config.app + config.html.src)
        .pipe(htmlImport(config.app + config.html.layouts))
        .pipe(gulp.dest(config.app))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(config.app + config.css.src, ['css-build']);


    gulp.watch(config.app + config.watcher.import, ['import']);
    gulp.watch('app/layouts/*.html', ['import']);
    gulp.watch(config.app + config.watcher.import, browserSync.reload);
    gulp.watch(config.app + config.watcher.js, browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.app
        }
    });
});
//
// gulp.task('qwe', function() {
//     gulp.src('./app/css/main.css')
//         .pipe(cleanCSS({keepBreaks: false}))
//         .pipe(gulp.dest('./app/css/test'));
// });
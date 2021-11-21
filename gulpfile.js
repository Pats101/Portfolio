// const { watch } = require('browser-sync');
const { watch, series } = require('gulp'); //src, dest, watch,
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');


/**
 *  -- TOP LEVEL FUNTIONS --
 * gulp.task - Define tasks
 * gulp.src - Point to files to use
 * gulp.dest -  point to folder to output files
 * gulp.watch - watch files and folders for change
 */

// Logs Message
gulp.task('message', async function(){
    return console.log('Gulp is running now...');
});

// gulp.task('default', async function(){
//     return console.log('Gulp is running now...');
// });

// COpy all html files
gulp.task('copyHtml', async () => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// Task to minify css using the cleanCss package variable
gulp.task('minify-css', async () => {
    gulp.src('src/css/*.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});

// Minify images
// gulp.task('minify-image', async () => {

//     await imagemin(['src/images/*.jpg', './dist/images', {
//         use: [imageminMozjpeg()]
//     }]);
// });

// gulp.src('src/images/*.jpg')
// .pipe(imagemin())
// .pipe(gulp.dest('./dist/images'));


// Browsersync Task
gulp.task('syncBrowserServe', async (cb) => {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
});

// BrowsersyncReload - reloads our browser
gulp.task('browsersyncReload', async (cb) => {
    browsersync.reload();
    cb();
});

// Our Watch task keeps an eye on our files detect change
// gulp.task('', async () => {
//     watch('*.html', browsersyncReload); // change detected in html files
//     watch('src/css/**/*.css', series(minify-css, browsersyncReload)); // if any change is detected in css files then reload. if you have js and css then use []
// });

// Default Gulp task (My gulp workflow)
// exports.default = series(message, copyHtml, minify-css, syncBrowserServe, watchTask);

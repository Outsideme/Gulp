// Импортируем основной модуль Gulp
import gulp from 'gulp';
// Импортируем константы path (пути)
import { path } from './gulp/config/path.js';
// Импорт объекта со всеми плагинами
import { plugins } from "./gulp/config/plugins.js"


// Передаём значение в глобальный объект
global.app = {
	isBuild: process.argv.includes('--build'), // Переменная process.argv может хранить в себе переданный флаг
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins,

}

// Импорт всех задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { sass } from './gulp/tasks/sass.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import { sprite } from './gulp/tasks/svgSprite.js'
import { zip } from './gulp/tasks/zip.js'
import { ftp } from './gulp/tasks/ftp.js'
// Наблюдатель за изменениями в файлах
function watcher () {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.sass, sass)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
	gulp.watch(path.watch.images, images)
}

// export { sprite }
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, sass, js, images))

// Построение сценариеы выполнения задач
const dev = gulp.series(reset, sprite, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)
const deployFTP = gulp.series(reset, mainTasks, ftp)

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение задач по умолчанию
gulp.task('default', dev)

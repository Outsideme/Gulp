import replace from "gulp-replace" // Поиска и замена
import plumber from "gulp-plumber" // Обработка ошибок
import notify from "gulp-notify" // Сообщения (подсказки)
import browsersync from "browser-sync" // Локальный сервер
import newer from "gulp-newer" // Проверяет, обновилась ли картинка
import ifPlugin from "gulp-if" // Условное ветвление
// Экспортируемый объект со всеми плагинами
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}

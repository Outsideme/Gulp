// Получаем путь к исходникам
export const copy = () => {
	return app.gulp.src(app.path.src.files)
// Теперь необходимо какое-то действие с полученными файлами
	.pipe(app.gulp.dest(app.path.build.files))
}

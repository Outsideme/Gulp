import svgSprite from 'gulp-svg-sprite'

export const sprite = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: `../icons/icons.svg`,
				// Создаём страницу с перечнем иконок
				// Создаётся пример HTML файл с превью
				example: true
			}
		},

	}))
	.pipe(app.gulp.dest(`${app.path.build.images}`))
}

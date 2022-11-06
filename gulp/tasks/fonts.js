import fs, { appendFile } from 'fs' // Node плагин, который работает с файловой системой
import fonter from 'gulp-fonter' // Позволит преобразовать формат otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2' // Позволит из ttf формата конвертировать в woff2

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
	// Конвертируем в .ttf
	.pipe(fonter({
		formats: ['ttf']
	}))
	// Выгружаем в исходную папку
	.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	//Ищем файлы .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
	// Конвертируем в woff
	.pipe(fonter({
		formats: ['woff']
	}))
	// Выгржаем в dest
	.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	// Ищем файлы .ttf
	.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
	// Конвертируем в .woff2
	.pipe(ttf2woff2())
	// Выгружаем в dest
	.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/sass/fonts.sass`
	// Проверяем, существует ли файл шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles){
		if (fontsFiles) {
			//Проверяем, существует ли файл стилей для подклюения шрифтов
			if (!fs.existsSync(fontsFile)){
				// Если файла нет, то создаём его
				fs.writeFile(fontsFile, '', cb)
				let newFileOnly
				for (let index = 0; index < fontsFiles.length; index++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[index].split('.')[0]
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900
						} else {
							fontWeight = 400
						}
						fs.appendFile(fontsFile, `@font-face \n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2")\n\tsrc:  url("../fonts/${fontFileName}.woff") format("woff")\n\tfont-weight: ${fontWeight}\n\tfont-style: normal\n\r\n`, cb)
						newFileOnly = fontFileName
					}
				}
			} else {
				// Усли файл есть, выводим сообщение в консоль
				console.log('Файл sass/fonts.sass уже существует. Для обновления нужно его удалить и перезапустить gulp');
			}

		} else {
			// Если шрифтов нет
			fs.unlink(fontsFile, cb)
		}
	})
	return app.gulp.src(`${app.path.srcFolder}`)
}
function cb() { }

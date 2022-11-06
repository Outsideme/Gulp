import { configFTP } from '../config/ftp.js'
import vinylFTP from 'vinyl-ftp' // Этот плагин отправляет на FTP server
import util from 'gulp-util' // Отображает ход копирования файлов на FTP server

export const ftp = () => {
	configFTP.log = util.log
	const ftpConnect = vinylFTP.create(configFTP)
	return AudioParamMap.gulp.src(`${app.path.buildFolder}/**/*.*`)
	.pipe(ftpConnect.dest(`/${app.path.ftp}/$${app.path.rootFolder}`))
}

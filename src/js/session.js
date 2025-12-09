import readXlsxFile from 'read-excel-file'

// Variables globales
const root = document.getElementById('root')
const modalSession = document.querySelector('.session__modal')

// Esperar a que el DOM esté completamente cargado
const initSession = () => {
	const sendForm = document.getElementById('sendForm')
	if (!sendForm) {
		// Si el formulario no existe aún, reintentar después de un breve delay
		setTimeout(initSession, 100)
		return
	}

	const formContainer = sendForm.parentNode.parentNode

	if (sessionStorage.length == 0 || sessionStorage.session == 'false') {
		formContainer.classList.remove('hide')
	} else {
		formContainer.classList.add('hide')
	}

	// Programar reapertura del formulario en horarios específicos sin afectar rendimiento
	const PROMPT_TIMES = [
		{ h: 6, m: 15 },
		{ h: 8, m: 15 },
		{ h: 12, m: 14 },
		{ h: 14, m: 14 },
		{ h: 16, m: 45 },
		{ h: 18, m: 0 },
	]

	const getNextPromptDelayMs = () => {
		const now = new Date()
		let next = null

		for (const t of PROMPT_TIMES) {
			const candidate = new Date(now)
			candidate.setHours(t.h, t.m, 0, 0)
			if (candidate <= now) {
				candidate.setDate(candidate.getDate() + 1)
			}
			if (!next || candidate < next) {
				next = candidate
			}
		}

		return next ? next.getTime() - now.getTime() : 0
	}

	const scheduleNextPrompt = () => {
		const delay = getNextPromptDelayMs()
		if (!delay || delay < 0) return

		window.setTimeout(() => {
			// Resetear sessionStorage para forzar que se muestre el formulario
			sessionStorage.setItem('session', 'false')
			// Mostrar de nuevo el formulario y limpiarlo
			formContainer.classList.remove('hide')
			// Limpiar mensajes de error si existen
			const errorElement = formContainer.querySelector('.sessionRec__error')
			if (errorElement) {
				errorElement.innerHTML = ''
			}
			if (typeof sendForm.reset === 'function') {
				sendForm.reset()
			}
			// Programar el siguiente horario
			scheduleNextPrompt()
		}, delay)
	}

	scheduleNextPrompt()

	// Función para activar el modo de prueba con comando oculto
	const activateTestMode = () => {
		const formContainer = sendForm.parentNode.parentNode
		// Ocultar el formulario
		formContainer.classList.add('hide')
		// Almacenar "USUARIO PRUEBA" en userAsesor
		localStorage.setItem('userAsesor', 'USUARIO PRUEBA PRUEBA')
		// Establecer la sesión activa en el root
		if (root) {
			root.setAttribute('active-session', 'USUARIO PRUEBA PRUEBA')
		}
		// Establecer la sesión como activa en sessionStorage
		sessionStorage.setItem('session', 'true')
		console.log('Modo de prueba activado')
	}

	// Función para reactivar el formulario (mostrarlo de nuevo)
	const reactivateForm = () => {
		const formContainer = sendForm.parentNode.parentNode
		// Mostrar el formulario
		formContainer.classList.remove('hide')
		// Limpiar mensajes de error si existen
		const errorElement = formContainer.querySelector('.sessionRec__error')
		if (errorElement) {
			errorElement.innerHTML = ''
		}
		// Resetear el formulario
		if (typeof sendForm.reset === 'function') {
			sendForm.reset()
		}
		// Limpiar la sesión
		sessionStorage.setItem('session', 'false')
		// Limpiar el usuario de prueba
		localStorage.removeItem('userAsesor')
		// Remover el atributo de sesión activa del root
		if (root) {
			root.removeAttribute('active-session')
		}
		console.log('Formulario reactivado')
	}

	// Exponer la función para permitir cierre de sesión desde React
	window.reactivateSessionForm = reactivateForm

	// Detector de comandos ocultos
	const initHiddenCommand = () => {
		let typedSequence = ''
		const COMMANDS = {
			hide: activateTestMode,
			show: reactivateForm,
		}
		const MAX_COMMAND_LENGTH = Math.max(...Object.keys(COMMANDS).map(cmd => cmd.length))
		const RESET_TIME = 2000 // Resetear la secuencia después de 2 segundos sin teclear

		let resetTimeout = null

		const handleKeyPress = e => {
			// Solo detectar teclas de letras (ignorar cuando se está escribiendo en inputs)
			if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
				return
			}

			// Agregar la tecla presionada a la secuencia
			typedSequence += e.key.toLowerCase()

			// Limitar la longitud de la secuencia al tamaño del comando más largo
			if (typedSequence.length > MAX_COMMAND_LENGTH) {
				typedSequence = typedSequence.slice(-MAX_COMMAND_LENGTH)
			}

			// Verificar si la secuencia coincide con algún comando
			for (const [command, action] of Object.entries(COMMANDS)) {
				if (typedSequence.endsWith(command)) {
					action()
					typedSequence = '' // Resetear después de activar
					break
				}
			}

			// Resetear el timeout
			clearTimeout(resetTimeout)
			resetTimeout = setTimeout(() => {
				typedSequence = ''
			}, RESET_TIME)
		}

		document.addEventListener('keydown', handleKeyPress)
	}
	const getControlDeAccesos = async () => {
		const rutaNoTocar = `./BASES_XxxXxx/NO_TOCAR.xlsx`
		const rutaNoTocarCompleta = new URL(rutaNoTocar, window.location.href).href

		const response = await fetch(rutaNoTocarCompleta)
			.then(response => response.blob())
			.then(async data => {
				return readXlsxFile(data)
			})
			.then(async data => {
				const [headerRow, ...dataRows] = data
				const objetoDeFila = dataRows.map(row => {
					const objeto = {}
					row.forEach((value, index) => {
						objeto[headerRow[index]] = value
					})
					return objeto
				})

				const controlDeAccesos = objetoDeFila.find(item => item.CLAVE == 'control de accesos')
				if (controlDeAccesos) {
					return controlDeAccesos.VALOR
				} else {
					throw new Error('La clave control de accesos no existe en la base de no tocar')
				}
			})

			.catch(error => {
				console.log('Error al cargar la base de no tocar', error)
			})

		return response
	}

	// Inicializar el detector de comando oculto
	initHiddenCommand()

	// Agregar el event listener del formulario
	sendForm.addEventListener('submit', async e => {
		e.preventDefault()

		const controlDeAccesos = await getControlDeAccesos()

		const ruta = `./BASES_XxxXxx/BASE_PERSONAL.xlsx`

		const rutaCompleta = new URL(ruta, window.location.href).href
		fetch(rutaCompleta)
			.then(response => response.blob())
			.then(async data => {
				return readXlsxFile(data)
			})
			.then(async data => {
				// Procesar el contenido del Excel
				const [headerRow, ...dataRows] = data

				// Validar la estructura del archivo
				if (headerRow[0] !== 'ASESOR' || headerRow[1] !== 'CEDULA') {
					throw new Error('El archivo Excel no tiene la estructura correcta')
				}

				const dataAccesos = dataRows.map(row => {
					const objeto = {}
					row.forEach((value, index) => {
						objeto[headerRow[index]] = value
					})
					return objeto
				})

				return dataAccesos
			})
			.then(dataAccesos => {
				if (dataAccesos.find(item => item.CEDULA == e.target.elements[0].value)) {
					const user = dataAccesos.find(item => item.CEDULA == e.target.elements[0].value)
					root.setAttribute('active-session', user.ASESOR)
					// Guardar el nombre del asesor en localStorage para persistencia
					localStorage.setItem('userAsesor', user.ASESOR)
					const data = {
						usuario: e.target.elements[0].value,
						campana: e.target.elements[1].value,
						modulo: e.target.elements[2].value,
						observaciones: 'v1.0.0',
					}
					// Ocultar el formulario en lugar de eliminarlo para que pueda reaparecer en los horarios programados
					formContainer.classList.add('hide')
					showModal({
						title: 'Se estan enviado los datos del inicio de sesion',
						message: 'Enviado datos espere unos segundos...',
						loader: true,
					})
					// https://retoolapi.dev/luBbwU/data
					fetch(controlDeAccesos, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(data),
					})
						.then(response => {
							console.log(response)
							return response.json()
						})
						.then(result => {
							sessionStorage.setItem('session', true)
							formContainer.classList.add('hide')

							showModal({
								icon: 'success',
								title: 'Datos enviados correctamente',
								message: 'Los datos han sido registrados correctamente para el inicio de sesión',
							})
						})
						.catch(error => {
							sessionStorage.setItem('session', false)
							showModal({
								icon: 'error',
								title: 'Error',
								message: 'Los datos no se enviaron por un error a la conexión con la base del control de  accesos.',
							})
							console.log(error)
						})
				} else {
					formContainer.classList.remove('hide')
					formContainer.querySelector('.sessionRec__error').innerHTML = 'Usuario no existe en el sistema'
				}
			})
			.catch(error => {
				console.log('Error al cargar la base de personal', error)
			})
	})
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initSession)
} else {
	initSession()
}

const showModal = data => {
	modalSession.close()
	modalSession.showModal()

	switch (data.icon) {
		case 'success':
			modalSession.children[0].children[1].classList.remove('show')
			modalSession.children[0].children[2].classList.remove('show')
			modalSession.children[0].children[0].classList.add('show')
			break

		case 'error':
			modalSession.children[0].children[0].classList.remove('show')
			modalSession.children[0].children[2].classList.remove('show')
			modalSession.children[0].children[1].classList.add('show')
			break

		default:
			modalSession.children[0].children[2].classList.add('show')
			modalSession.children[0].children[1].classList.remove('show')
			modalSession.children[0].children[0].classList.remove('show')
			break
	}

	modalSession.children[1].innerHTML = data.title
	modalSession.children[2].innerHTML = data.message
	data.loader ? '' : modalSession.children[3].classList.add('hide')
	data.loader ? modalSession.children[4].classList.add('hide') : modalSession.children[4].classList.remove('hide')
	modalSession.children[4].children[0].addEventListener('click', () => {
		modalSession.close()
	})
}

const setVersion = async () => {
	const ruta = `./BASES_XxxXxx/NO_TOCAR.xlsx`
	const rutaCompleta = new URL(ruta, window.location.href).href
	const response = await fetch(rutaCompleta)
	const data = await response.blob()
	const dataExcel = await readXlsxFile(data)
	const [headerRow, ...dataRows] = dataExcel
	// Validar la estructura del archivo
	if (headerRow[0] !== 'CLAVE' || headerRow[1] !== 'VALOR') {
		throw new Error('El archivo Excel no tiene la estructura correcta')
	}
	const jsonGeneral = dataRows.map(row => {
		const objeto = {}
		row.forEach((value, index) => {
			objeto[headerRow[index]] = value
		})
		return objeto
	})
	const version = jsonGeneral[0].VALOR
	document.getElementById('sessionRec__version').innerHTML = 'version ' + version
}

setVersion()

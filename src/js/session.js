import readXlsxFile from 'read-excel-file'
const sendForm = document.getElementById('sendForm')

const root = document.getElementById('root')
const modalSession = document.querySelector('.session__modal')
if (sessionStorage.length == 0 || sessionStorage.session == 'false') {
	sendForm.parentNode.parentNode.classList.remove('hide')
} else {
	sendForm.parentNode.parentNode.classList.add('hide')
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

sendForm.addEventListener('submit', e => {
	e.preventDefault()

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
				e.target.parentNode.parentNode.remove()
				showModal({
					title: 'Se estan enviado los datos del inicio de sesion',
					message: 'Enviado datos espere unos segundos...',
					loader: true,
				})
				// https://retoolapi.dev/luBbwU/data
				fetch('http://colbogweb26:8083/Webservices_Simulador/api/main/insUpdTransaccion', {
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
						sendForm.parentNode.parentNode.classList.add('hide')

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
				sendForm.parentNode.parentNode.classList.remove('hide')
				sendForm.parentNode.parentNode.querySelector('.sessionRec__error').innerHTML = 'Usuario no existe en el sistema'
			}
		})
		.catch(error => {
			console.log('Error al cargar la base de personal', error)
		})
})

setVersion()

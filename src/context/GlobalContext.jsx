import { createContext, useState, useEffect } from 'react'
import Localbase from 'localbase'
import readXlsxFile from 'read-excel-file'
import { toast } from 'sonner'

const GlobalContext = createContext()
const WTLocalbase = new Localbase('db_nombre_campana')

const GlobalProvider = ({ children }) => {
	const [scheme, setScheme] = useState('light')
	const [admin, setAdmin] = useState(false)
	const [activeAppNote, SetActiveAppNote] = useState(false)

	// ESTADOS DEL CRONOMETRO
	const [timers, setTimers] = useState([0, 0, 0]) // Estado para almacenar los tiempos de los tres temporizadores
	const [intervalIds, setIntervalIds] = useState([null, null, null]) // Estado para almacenar los IDs de los intervalos
	const [soundPlayed, setSoundPlayed] = useState(false) // Estado para controlar si se ha reproducido el sonido
	const [visibleTimers, setVisibleTimers] = useState(1) // Controla cuántos temporizadores mostrar

	// Sistema de audio para el cronómetro usando Web Audio API
	let audioContext = null
	let oscillator = null
	let gainNode = null
	let isAlarmPlaying = false

	// Función para crear y reproducir alarma con OscillatorNode
	const playAlarmSound = () => {
		if (isAlarmPlaying) return

		try {
			// Crear contexto de audio si no existe
			audioContext = new (window.AudioContext || window.webkitAudioContext)()

			// Crear nodo de ganancia para controlar el volumen
			gainNode = audioContext.createGain()
			gainNode.connect(audioContext.destination)
			gainNode.gain.setValueAtTime(0.3, audioContext.currentTime) // Volumen al 30%

			isAlarmPlaying = true

			// Función para crear un beep
			const createBeep = (frequency, duration, delay = 0) => {
				const osc = audioContext.createOscillator()
				const tempGain = audioContext.createGain()

				osc.connect(tempGain)
				tempGain.connect(gainNode)

				osc.frequency.setValueAtTime(frequency, audioContext.currentTime + delay)
				tempGain.gain.setValueAtTime(0, audioContext.currentTime + delay)
				tempGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + delay + 0.01)
				tempGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration)

				osc.start(audioContext.currentTime + delay)
				osc.stop(audioContext.currentTime + delay + duration)
			}

			// Crear patrón de alarma: 3 beeps rápidos, pausa, repetir
			const beepPattern = () => {
				createBeep(800, 0.2, 0) // Beep 1
				createBeep(1000, 0.2, 0.25) // Beep 2
				createBeep(800, 0.2, 0.5) // Beep 3
				createBeep(1000, 0.3, 0.75) // Beep 4 (más largo)
			}

			// Reproducir patrón inmediatamente
			beepPattern()

			// Repetir el patrón cada 2 segundos por 10 segundos
			let repetitions = 0
			const maxRepetitions = 5

			const intervalId = setInterval(() => {
				repetitions++
				if (repetitions < maxRepetitions && isAlarmPlaying) {
					beepPattern()
				} else {
					clearInterval(intervalId)
					stopAlarmSound()
				}
			}, 2000)
		} catch (error) {
			console.log('Error creando alarma de audio:', error)
			isAlarmPlaying = false
		}
	}

	// Función para detener la alarma
	const stopAlarmSound = () => {
		isAlarmPlaying = false
		if (oscillator) {
			try {
				oscillator.stop()
				oscillator = null
			} catch (e) {
				// Oscillator ya fue detenido
			}
		}
		if (audioContext && audioContext.state !== 'closed') {
			audioContext.close()
			audioContext = null
		}
	}

	const templatesDDBB = ['arbol', 'ejemplo', 'notas']
	const maps = {
		ejemplo: {
			CODIGO: 'codigo',
			DATOS: 'DATOS',
			ESCALAMIENTO: 'ESCALAMIENTO',
			AREA: 'AREA',
			div: {
				WEB_TRAINING: {
					T_ACTUAL: 'T_ACTUAL',
					PLANTILLA: 'PLANTILLA',
					DEFINICION: 'DEFINICION',
				},
			},
		},
		arbol: {
			CODIGO: 'CODIGO',
			DATOS: 'DATOS',
			ESCALAMIENTO: 'ESCALAMIENTO',
			AREA: 'AREA',
			DEFINICION: 'DEFINICION',
			EXCEPCION: 'EXCEPCION',
			NOTAS: 'NOTAS',
			T_ACTUAL: 'T_ACTUAL',
			PLANTILLA: 'PLANTILLA',
			ESCENARIO_2: 'ESCENARIO_2',
			ESCENARIO_3: 'ESCENARIO_3',
			ESCENARIO_4: 'ESCENARIO_4',
			ESCENARIO_5: 'ESCENARIO_5',
		},
	}
	const readExcelFile = async e => {
		// recorre los archivos cargados y valida si son bases correctas de la web training
		const filesList = e.target.files
		for (let i = 0; i < filesList.length; i++) {
			const file = filesList[i]
			const fileName = file.name.split('.')[0]
			if (templatesDDBB.includes(fileName)) {
				readXlsxFile(file, { map: maps[fileName] })
					.then(({ rows }) => {
						rows.forEach((row, id) => {
							WTLocalbase.collection(fileName).delete()
							WTLocalbase.collection(fileName).add({
								id,
								...row,
							})
						})
					})
					.then(() => {
						toast.success('Base de datos actualizada', {
							description: 'Por favor presiona F5 o actualiza la pagina para cargar la base.',
						})
					})
					.catch(error => {
						toast.error('Error al cargar la base de datos', {
							description: 'Verifica que el archivo excel que estas cargando es una base de datos correcta.',
						})
					})
			} else {
				toast.error('Error al cargar la base de datos', {
					description: 'Verifica que el archivo excel que estas cargando es una base de datos correcta.',
				})
			}
		}
	}

	// FUNCIONES DEL CRONOMETRO
	// Función para iniciar el cronómetro
	const iniciarCronometro = index => {
		const inputValue = parseInt(document.querySelector(`#timer-${index}`).value, 10) // Captura el valor del input
		if (isNaN(inputValue) || inputValue <= 0 || inputValue > 60) {
			toast.error('Debes ingresar un dato entre 1 y 60 segundos', {
				description: 'Valor inválido para el cronómetro',
			})
			return
		}
		const newTimers = [...timers]
		newTimers[index] = inputValue // Guardamos el valor en segundos en el índice correspondiente
		setTimers(newTimers) // Actualizamos el estado de los temporizadores

		// Limpiar intervalos anteriores
		if (intervalIds[index]) {
			clearInterval(intervalIds[index])
		}

		// Iniciamos el interval
		const newIntervalId = setInterval(() => {
			setTimers(prevTimers => {
				const updatedTimers = [...prevTimers]
				if (updatedTimers[index] <= 0) {
					clearInterval(newIntervalId) // Detener cuando llegue a 0
					setSoundPlayed(true)

					// Reproducir alarma personalizada con Web Audio API
					playAlarmSound()

					// Mostrar notificación con toast
					toast.warning(`¡Tiempo terminado!`, {
						description: `El Timer ${index + 1} ha finalizado`,
						duration: 5000,
						action: {
							label: 'Detener alarma',
							onClick: () => stopAlarmSound(),
						},
					})

					updatedTimers[index] = 0 // Aseguramos que el temporizador se detenga en 0
					return updatedTimers // Retornamos los tiempos actualizados
				}

				updatedTimers[index] = updatedTimers[index] - 1 // Reducimos el tiempo en 1 segundo
				return updatedTimers // Retornamos los tiempos actualizados
			})
		}, 1000)
		// Guardamos el ID del interval
		const newIntervalIds = [...intervalIds]
		newIntervalIds[index] = newIntervalId
		setIntervalIds(newIntervalIds)

		// Aumentar el número de temporizadores visibles al ingresar un valor
		if (index + 1 > visibleTimers) {
			setVisibleTimers(index + 1) // Mostrar el siguiente temporizador
		}
	}

	const apagarSonido = () => {
		setSoundPlayed(false)
		stopAlarmSound()
	}

	// Función para reiniciar todos los valores
	const reiniciarValores = () => {
		// Reiniciar los temporizadores a 0
		setTimers([0, 0, 0])

		// Limpiar los intervalos
		intervalIds.forEach(id => {
			if (id) clearInterval(id)
		})

		setIntervalIds([null, null, null]) // Resetear los IDs de los intervalos

		// Reiniciar los valores de los inputs
		for (let i = 0; i < visibleTimers; i++) {
			// Solo acceder a los inputs visibles
			const inputElement = document.querySelector(`#timer-${i}`)
			if (inputElement) inputElement.value = '' // Limpiar el valor del input si existe
		}

		// Reiniciar el número de temporizadores visibles a 1
		setVisibleTimers(1)

		// Apagar el sonido si está activo
		if (soundPlayed) {
			apagarSonido()
		}

		// Mostrar notificación de éxito
		toast.success('Valores reiniciados', {
			description: 'Todos los timers han sido reiniciados',
		})
	}

	const showApp = bool => {
		if (bool == false || bool == true) {
			SetActiveAppNote(bool)
			localStorage.setItem('visible', bool)
		} else {
			SetActiveAppNote(!activeAppNote)
			localStorage.setItem('visible', !activeAppNote)
		}
	}

	// Actualizar el título de la página con el cronómetro más cercano a 0
	useEffect(() => {
		// Filtrar los temporizadores activos (mayores a 0) y obtener el mínimo
		const activeTimers = timers.filter(time => time > 0)
		if (activeTimers.length > 0) {
			const closestTimer = Math.min(...activeTimers)
			document.title = `Tiempo restante: ${closestTimer}s`
		} else {
			document.title = 'Web Training' // Título por defecto cuando no hay temporizadores
		}
	}, [timers]) // Ejecutar cuando cambien los tiempos

	const data = {
		templatesDDBB,
		WTLocalbase,
		readExcelFile,
		scheme,
		setScheme,
		showApp,
		activeAppNote,
		admin,
		setAdmin,
		SetActiveAppNote,
		// Estados y funciones del cronómetro
		timers,
		intervalIds,
		soundPlayed,
		visibleTimers,
		iniciarCronometro,
		apagarSonido,
		reiniciarValores,
		setVisibleTimers,
		// Funciones de audio personalizadas
		playAlarmSound,
		stopAlarmSound,
	}
	return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext

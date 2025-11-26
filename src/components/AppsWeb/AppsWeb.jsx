import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Loader1 from '../Loaders/Loader1'

import { loadExcelData } from '../../js/LoadExcelData'

// Función para copiar al portapapeles
const copyToClipboard = link => {
	navigator.clipboard
		.writeText(link)
		.then(() => {
			// Crear una notificación visual temporal
			const notification = document.createElement('div')
			notification.textContent = '¡Link copiado al portapapeles!'
			notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4ade80;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `
			document.body.appendChild(notification)

			// Remover después de 3 segundos
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification)
				}
			}, 3000)
		})
		.catch(err => {
			console.error('Error al copiar: ', err)
			// Notificación de error
			const errorNotification = document.createElement('div')
			errorNotification.textContent = 'Error al copiar el link'
			errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `
			document.body.appendChild(errorNotification)

			setTimeout(() => {
				if (errorNotification.parentNode) {
					errorNotification.parentNode.removeChild(errorNotification)
				}
			}, 3000)
		})
}

// Función para obtener colores según el área
const getColorByArea = area => {
	const colors = {
		HOGAR: 'bg-gradient-to-br from-blue-500 to-blue-600',
		MOVIL: 'bg-gradient-to-br from-green-500 to-green-600',
		VENTAS: 'bg-gradient-to-br from-purple-500 to-purple-600',
		OTROS: 'bg-gradient-to-br from-orange-500 to-orange-600',
		ADICIONALES: 'bg-gradient-to-br from-pink-500 to-pink-600',
	}
	return colors[area] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

// Función para obtener la imagen correcta basándose en el nombre
const getImageByName = imageName => {
	// Verificar si el nombre ya incluye la extensión
	if (imageName.includes('.')) {
		return `BASES_ClaroSwat/Aplicativos_Web/imagenes/${imageName}`
	}
	// Si no incluye extensión, intentar primero con .PNG
	return `BASES_ClaroSwat/Aplicativos_Web/imagenes/${imageName}.PNG`
}

export default function AppsWeb() {
	const [selectedApp, setSelectedApp] = useState()
	const [hoveredApp, setHoveredApp] = useState(null)
	const [isHovering, setIsHovering] = useState(false)
	const timeoutRef = useRef(null)

	const [dataDb, setDataDb] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	// Manejador de hover
	const handleHover = app => {
		setHoveredApp(app)
		setIsHovering(true)
	}

	// Manejador para cuando el mouse sale
	const handleHoverEnd = () => {
		setIsHovering(false)
	}

	const ruta = 'Aplicativos_Web/Aplicativos_Web.xlsx'
	const headers = ['TITULO', 'LINK', 'IMAGEN', 'AREA', 'CLIPBOARD']

	useEffect(() => {
		loadExcelData(ruta, headers)
			.then(({ data, error, isLoading }) => {
				const apps = data.map((app, index) => ({
					id: index + 1,
					title: app.TITULO,
					description: app.AREA,
					color: getColorByArea(app.AREA),
					textColor: 'text-white',
					link: app.LINK,
					icon: getImageByName(app.IMAGEN),
					area: app.AREA,
					hasClipboard: app.CLIPBOARD || false,
				}))
				console.log(apps)
				setDataDb(apps)
				setSelectedApp(apps[0])
				setIsLoading(isLoading)
				setError(error)
			})
			.catch(err => {
				console.error('Error al cargar los datos:', err)
				setError(err.message)
				setIsLoading(false)
			})
	}, [])

	// Efecto para manejar el cambio de aplicación con retraso
	useEffect(() => {
		if (hoveredApp && isHovering) {
			timeoutRef.current = setTimeout(() => {
				setSelectedApp(hoveredApp)
			}, 200) // Pequeño retraso para evitar cambios rápidos
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [hoveredApp, isHovering])

	return (
		<div className="overflow-hidden relative mx-auto h-full rounded-xl shadow-lg">
			<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ff8a9d,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#472c2c,transparent)]"></div>
			{/* Título principal */}
			<div className="px-4 py-1 m-auto mb-4 bg-white rounded-b-3xl border-b-2 border-primary w-fit">
				<h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primaryDark via-primary to-primaryDark">
					Aplicativos Web
				</h1>
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center h-full">
					<Loader1 />
				</div>
			) : error ? (
				<div className="flex flex-col justify-center items-center h-full">
					<div className="flex flex-col items-center p-8 space-y-6 bg-gradient-to-br rounded-2xl border-2 shadow-2xl backdrop-blur-sm from-background via-card to-muted border-destructive/20 shadow-destructive/10">
						<div className="text-6xl animate-pulse">❌</div>
						<h2 className="text-2xl font-bold text-destructive">Error al cargar los datos</h2>
						<p className="max-w-md leading-relaxed text-center text-muted-foreground">{error}</p>
						<Button
							onClick={() => window.location.reload()}
							variant="destructive"
							size="lg"
							className="mt-4 bg-gradient-to-r transition-all duration-300 from-destructive to-destructive/80 hover:shadow-lg hover:scale-105">
							<RefreshCw className="mr-2 w-4 h-4" />
							REINTENTAR
						</Button>
					</div>
				</div>
			) : dataDb.length > 0 ? (
				<div className="flex flex-col gap-6 p-4 lg:flex-row relative lg:h-[400px] 2xl:h-[500px] justify-center">
					{/* Tarjeta grande a la izquierda */}
					<div className="flex overflow-hidden justify-center items-center w-full max-w-xl">
						<AnimatePresence mode="wait">
							<motion.div
								key={selectedApp.id}
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: 20, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="w-full max-w-full h-full">
								<div
									className={`flex flex-col items-center justify-between p-6 w-full h-full max-h-[550px] rounded-lg ${selectedApp.color} ${selectedApp.textColor} overflow-hidden`}>
									<div className="flex flex-col justify-center items-center rounded-lg">
										<figure className="flex justify-center items-center mb-4 w-full max-h-60 bg-gradient-to-br rounded-lg from-slate-100 to-slate-300">
											<img
												src={selectedApp.icon}
												alt={selectedApp.title}
												className="object-contain w-3/4 h-full max-h-48"
											/>
										</figure>
										<h2 className="mb-2 text-2xl font-bold text-center">{selectedApp.title}</h2>
										<p className="mb-4 text-base text-center opacity-90">{selectedApp.description}</p>
									</div>

									{selectedApp.hasClipboard ? (
										<Button
											className="justify-between mt-4 w-full text-white bg-gray-800 hover:bg-gray-700"
											size="lg"
											onClick={() => copyToClipboard(selectedApp.link)}>
											<span>Copiar link</span>
											<Copy className="ml-2 w-5 h-5" />
										</Button>
									) : (
										<Button
											className="justify-between mt-4 w-full text-white bg-gray-800 hover:bg-gray-700"
											size="lg"
											onClick={() => window.open(selectedApp.link, '_blank')}>
											<span>Ir a la aplicación</span>
											<ArrowRight className="ml-2 w-5 h-5" />
										</Button>
									)}
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Cuadrícula de tarjetas a la derecha */}
					<div className="overflow-y-auto p-2 w-full h-auto lg:w-1/2">
						<div className="flex flex-wrap gap-3 justify-center">
							{dataDb.map(app => (
								<motion.div
									key={app.id}
									whileHover={{ scale: 1.05 }}
									onHoverStart={() => handleHover(app)}
									onHoverEnd={handleHoverEnd}
									onClick={() => {
										setSelectedApp(app)
										// Redirección al hacer click
										if (app.hasClipboard) {
											copyToClipboard(app.link)
										} else {
											window.open(app.link, '_blank')
										}
									}}
									className={`cursor-pointer rounded-lg p-3 transition-all duration-200 dato-buscado ${
										selectedApp.id === app.id ? app.color : 'bg-gray-100 hover:shadow-md'
									}`}>
									<div className="flex flex-col justify-center items-center w-36 h-36">
										<figure className="flex justify-center items-center mb-2 w-20 h-20">
											<img src={app.icon} alt={app.title} className="object-contain w-full h-full" />
										</figure>
										<p
											className={`text-center text-xs font-medium leading-tight ${
												selectedApp.id === app.id ? 'text-white' : 'text-gray-700'
											}`}>
											{app.title}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center h-full">
					<div className="flex flex-col items-center p-8 space-y-6 bg-gradient-to-br rounded-2xl border-2 shadow-2xl backdrop-blur-sm from-background via-card to-muted border-border/30 shadow-muted-foreground/5">
						<div className="text-6xl animate-bounce text-muted-foreground/70">📄</div>
						<h2 className="text-2xl font-bold text-muted-foreground">No se encontraron datos</h2>
						<p className="max-w-md leading-relaxed text-center text-muted-foreground/80">
							El archivo Excel está vacío o no contiene datos válidos.
						</p>
						<Button
							onClick={() => window.location.reload()}
							variant="outline"
							size="lg"
							className="mt-4 transition-all duration-300 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:scale-105">
							<RefreshCw className="mr-2 w-4 h-4" />
							RECARGAR
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

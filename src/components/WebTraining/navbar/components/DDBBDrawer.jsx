import { useContext, useState } from 'react'
import { FileUp, Download, X, Database } from 'lucide-react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import GlobalContext from '@/context/GlobalContext'
import { toast } from 'sonner'

export default function ExcelDrawer() {
	const [file, setFile] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	const { readExcelFile, templatesDDBB } = useContext(GlobalContext)

	const plantillas = [
		{ id: 1, nombre: 'Plantilla de Inventario' },
		{ id: 2, nombre: 'Plantilla de Ventas' },
		{ id: 3, nombre: 'Plantilla de Clientes' },
		{ id: 4, nombre: 'Plantilla de Productos' },
		{ id: 5, nombre: 'Plantilla de Empleados' },
		{ id: 6, nombre: 'Plantilla de Gastos' },
		{ id: 7, nombre: 'Plantilla de Proveedores' },
		{ id: 8, nombre: 'Plantilla de Presupuesto' },
	]

	const handleDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging(false)

		const files = e.dataTransfer.files // Accede a los archivos arrastrados
		if (files && files.length) {
			const fileEvent = { target: { files } } // Simula el evento onChange del input
			readExcelFile(fileEvent)
		} else {
			toast.error('Por favor, sube solo archivos Excel (.xlsx)')
		}
	}

	const handleFileChange = e => {
		const selectedFile = e.target.files[0]
		if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
			setFile(selectedFile)
		} else {
			alert('Por favor, sube solo archivos Excel (.xlsx)')
		}
	}

	const handleDownload = async nombre => {
		const url = `noTocar/plantillas/${nombre}.xlsx`
		try {
			const response = await fetch(url, { method: 'HEAD' })
			if (response.ok) {
				toast.success(`Descargando: ${nombre}`)
				window.open(url, '_blank')
			} else {
				toast.error('El archivo no existe o no está disponible.')
			}
		} catch (error) {
			toast.error('Error al intentar descargar el archivo.')
		}
	}
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="ghost" className="flex w-full justify-between">
					Cargar bases <Database className="h-4 w-4 text-primary" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="p-0 max-h-[90vh]">
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Zona de carga de archivos */}
						<div className="flex flex-col items-center">
							<DrawerHeader className="text-center">
								<DrawerTitle className="text-xl font-bold text-center text-primary">Cargar Archivo Excel</DrawerTitle>
								<DrawerDescription>
									Sube tu archivo Excel para crear una base de datos en la web training.
								</DrawerDescription>
							</DrawerHeader>
							<div
								className={`relative w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center min-h-[250px] transition-all
                  ${isDragging ? 'border-primary bg-red-50' : 'border-blue-400 hover:border-primary hover:bg-red-50'}`}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}>
								<div className="bg-gray-100 p-4 rounded-full mb-4">
									<FileUp className="h-10 w-10 text-primary" />
								</div>

								<p className="text-lg font-medium text-blue-600 mb-2">
									{file ? file.name : 'Suelta tu archivo aquí o buscalo'}
								</p>

								{!file && <p className="text-sm text-gray-500 mb-4">Solo archivos Excel (.xlsx)</p>}

								<input type="file" id="fileInput" className="hidden" accept=".xlsx" onChange={readExcelFile} />

								<label
									htmlFor="fileInput"
									className="cursor-pointer bg-primary hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
									Seleccionar archivo
								</label>
							</div>

							{file && (
								<div className="mt-4 w-full">
									<Button
										className="w-full bg-green-600 hover:bg-green-700"
										onClick={() => console.log('Procesando archivo:', file)}>
										Procesar Archivo
									</Button>
								</div>
							)}
						</div>

						{/* Zona de descarga de plantillas */}
						<div className="flex flex-col">
							<h3 className="text-xl font-bold mb-4 text-primary">Descargar Plantillas</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{/* {templatesDDBB.length > 0 ? (
									templatesDDBB.map((template, i) => {
										return (
											<a className="container-btn-file" href={`noTocar/plantillas/${template}.xlsx`} key={i}>
												<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
													<path
														d="M28.8125 .03125L.8125 5.34375C.339844 
														5.433594 0 5.863281 0 6.34375L0 43.65625C0 
														44.136719 .339844 44.566406 .8125 44.65625L28.8125 
														49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
														50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
														30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
														.21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
														6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
														29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
														43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
														13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
														21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
														22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
														15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
														28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
														27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
														14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
														20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"></path>
												</svg>
												Descargar plantilla: <strong> &nbsp;{template}</strong>
											</a>
										)
									})
								) : (
									<article className="templates">No hay plantilas disponibles para la web training</article>
								)} */}
								{templatesDDBB.length > 0 ? (
									templatesDDBB.map((plantilla, i) => (
										<Button
											key={i}
											variant="outline"
											className="flex justify-between items-center border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-800 py-6 px-4 rounded-lg shadow-sm transition-all hover:shadow-md"
											onClick={() => handleDownload(plantilla)}>
											<span className="font-medium">{plantilla}</span>
											<Download className="h-5 w-5 ml-2" />
										</Button>
									))
								) : (
									<article className="templates">No hay plantilas disponibles para la web training</article>
								)}
							</div>
						</div>
					</div>

					{/* Botón de cerrar */}
					<DrawerClose asChild>
						<Button
							className="w-full mt-6 bg-red-100 hover:bg-red-200 text-primary border-2 border-red-300 py-3 font-bold text-lg relative overflow-hidden group"
							variant="outline">
							<div
								className="absolute inset-0 bg-red-200 opacity-50 group-hover:opacity-70 transition-opacity"
								style={{
									backgroundImage:
										'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.1) 10px, rgba(255,0,0,0.1) 20px)',
								}}></div>
							<span className="relative flex items-center justify-center">
								CERRAR <X className="ml-2 h-5 w-5" />
							</span>
						</Button>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

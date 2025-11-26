import readXlsxFile from 'read-excel-file'
import { toast } from 'sonner'

export const loadExcelData = async (nombreArchivo, headerRows = []) => {
	try {
		// Hacer fetch del archivo Excel desde la carpeta EXCELES
		const ruta = `./BASES_ClaroSwat/${nombreArchivo}`

		const response = await fetch(ruta, { cache: 'no-store' })

		if (!response.ok) {
			throw new Error('No se pudo cargar el archivo Excel')
		}

		const blob = await response.blob()
		const contenidoExcel = await readXlsxFile(blob)

		// Procesar el contenido del Excel
		const [headerRow, ...dataRows] = contenidoExcel

		// Validar la estructura del archivo
		if (headerRows.length > 0 && headerRows.some(header => headerRow[header] !== headerRows[header])) {
			throw new Error('El archivo Excel no tiene la estructura correcta')
		}

		// Convertir filas a objetos
		const arrObjetos = dataRows.map(row => {
			const objeto = {}
			row.forEach((value, index) => {
				objeto[headerRow[index]] = value
			})
			return objeto
		})
		return { data: arrObjetos, error: null, isLoading: false }
	} catch (err) {
		console.error('Error al cargar el archivo Excel:', err)
		toast.error(`Error al cargar los datos: ${err.message}`)
		return null
	}
}

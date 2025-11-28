import { toast } from 'sonner'
import { copy } from 'clipboard-copy'
export const copyClipBoard = async value => {
	try {
		await copy('Texto a copiar')
		toast.success('Contenido copiado al portapapeles', {
			description: 'Presiona Ctrl + V para pegar',
		})
	} catch (err) {
		console.error('Error:', err)
		toast.error('Error al copiar el contenido', {
			description: 'No se pudo copiar el contenido',
		})
	}
}

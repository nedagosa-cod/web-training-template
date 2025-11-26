import { toast } from 'sonner'
export const copyClipBoard = value => {
	navigator.clipboard.writeText(value)
	toast.success('Contenido copiado al portapapeles', {
		description: 'Presiona Ctrl + V para pegar',
	})
}

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	return date.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}

export function slugify(text) {
	return text
		.toString()
		.normalize('NFD') // Para eliminar acentos
		.replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
		.toLowerCase()
		.replace(/\s+/g, '_') // Reemplaza espacios por guion bajo
		.replace(/[^\w\-]+/g, '') // Elimina caracteres especiales
		.replace(/\-\-+/g, '_') // Reemplaza múltiples guiones bajos por uno
		.replace(/^_+/, '') // Elimina guiones bajos al inicio
		.replace(/_+$/, '') // Elimina guiones bajos al final
}

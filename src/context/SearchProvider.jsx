import { createContext, useContext, useState } from 'react'
import searchSpotlight from '../data/spotlight.json'
import Fuse from 'fuse.js'

// Crear el contexto
const SearchContext = createContext()

// Función de proveedor del contexto
export const SearchProvider = ({ children }) => {
	// Datos de ejemplo para el índice
	const [searchTerm, setSearchTerm] = useState('')

	// Crear instancia de Fuse.js
	const fuse = new Fuse(searchSpotlight, {
		keys: ['title', 'content', 'keywords', 'name'],
		threshold: 0.3,
	})

	const filteredData = cards => {
		if (!searchTerm.trim()) {
			return cards
		}

		// Dividir el término de búsqueda en palabras individuales
		const searchWords = searchTerm
			.toLowerCase()
			.trim()
			.split(/\s+/) // Dividir por uno o más espacios
			.filter(word => word.length > 0) // Filtrar palabras vacías

		// Función para calcular la puntuación de relevancia de una card
		const calculateRelevanceScore = card => {
			let score = 0

			// Campos de alta prioridad (título y tipología)
			const highPriorityFields = [card.TITULO || '', card.TIPOLOGIA || '']

			// Campos de baja prioridad (texto largo/observaciones)
			const lowPriorityFields = [card.GUIONES || '']

			// Puntuación por coincidencias en campos de alta prioridad
			highPriorityFields.forEach(field => {
				const fieldText = field.toLowerCase()
				searchWords.forEach(word => {
					if (fieldText.includes(word)) {
						score += 10 // Puntuación alta para título/tipología
					}
				})
			})

			// Puntuación por coincidencias en campos de baja prioridad
			lowPriorityFields.forEach(field => {
				const fieldText = field.toLowerCase()
				searchWords.forEach(word => {
					if (fieldText.includes(word)) {
						score += 1 // Puntuación baja para texto largo
					}
				})
			})

			return score
		}

		// Filtrar y ordenar por relevancia
		const filteredCards = cards.filter(card => {
			// Concatenar todos los valores string del objeto en un solo texto
			const cardText = Object.values(card)
				.filter(value => typeof value === 'string')
				.join(' ')
				.toLowerCase()

			// Verificar que todas las palabras de búsqueda estén presentes
			return searchWords.every(word => cardText.includes(word))
		})

		// Ordenar por puntuación de relevancia (mayor a menor)
		return filteredCards.sort((a, b) => {
			const scoreA = calculateRelevanceScore(a)
			const scoreB = calculateRelevanceScore(b)
			return scoreB - scoreA // Orden descendente
		})
	}

	// Función de búsqueda que puede ser llamada desde cualquier parte de la app
	const handleSearchGlobal = term => {
		return fuse.search(term).map(result => result.item)
	}
	// Buscador por vista
	const handleSearchVista = value => {
		setSearchTerm(value)

		// Solo aplicar búsqueda visual si no hay paginación activa
		// Verificamos si existe un componente de paginación en la página
		const paginationExists = document.querySelector('[data-pagination="true"]')

		if (!paginationExists) {
			const elementos = document.querySelectorAll('.dato-buscado')

			if (value.trim() === '') {
				// Si no hay término de búsqueda, mostrar todos los elementos
				Array.from(elementos).forEach(card => {
					card.style.display = ''
				})
			} else {
				// Dividir el término de búsqueda en palabras individuales
				const searchWords = value
					.toLowerCase()
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.split(/\s+/)
					.filter(word => word.length > 0)

				// Filtrar elementos que coincidan con todas las palabras de búsqueda
				const depurados = Array.from(elementos).filter(card => {
					const cardText = card.textContent
						.toLowerCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')

					// Verificar que todas las palabras estén presentes
					return searchWords.every(word => cardText.includes(word))
				})

				Array.from(elementos).forEach(card => {
					card.style.display = 'none'
				})
				depurados.forEach(card => {
					card.style.display = ''
				})
			}
		} else {
			// Si hay paginación, asegurar que todos los elementos sean visibles
			// ya que el filtrado se maneja por la paginación
			const elementos = document.querySelectorAll('.dato-buscado')
			Array.from(elementos).forEach(card => {
				card.style.display = ''
			})
		}
	}

	const paginationValues = ({ data, pagina, CARDS_PER_PAGE }) => {
		const totalPaginas = Math.ceil(filteredData(data).length / CARDS_PER_PAGE)
		const cardsActuales = filteredData(data).slice((pagina - 1) * CARDS_PER_PAGE, pagina * CARDS_PER_PAGE)
		return { totalPaginas, cardsActuales }
	}
	return (
		<SearchContext.Provider
			value={{
				handleSearchVista,
				handleSearchGlobal,
				filteredData,
				paginationValues,
				searchTerm,
			}}>
			{children}
		</SearchContext.Provider>
	)
}

// Hook para usar el contexto
export const useSearch = () => {
	return useContext(SearchContext)
}

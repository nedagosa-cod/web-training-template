import { useState, useEffect } from 'react'

/**
 * Hook que verifica periódicamente el valor de un atributo del root
 * @param {string} attributeName - Nombre del atributo a observar
 * @param {number} interval - Intervalo en ms para verificar (default: 1000)
 * @returns {string|null} - Valor actual del atributo
 */
export function useRootAttributePolling(attributeName, interval = 1000) {
	const [attributeValue, setAttributeValue] = useState(null)

	useEffect(() => {
		const checkAttribute = () => {
			const root = document.documentElement || document.getElementById('root')
			const value = root?.getAttribute(attributeName)
			setAttributeValue(value)
		}

		// Verificar inmediatamente
		checkAttribute()

		// Configurar polling
		const intervalId = setInterval(checkAttribute, interval)

		// Cleanup
		return () => clearInterval(intervalId)
	}, [attributeName, interval])

	return attributeValue
}

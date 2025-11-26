import { useState, useEffect } from 'react'

/**
 * Hook personalizado para obtener y observar atributos del elemento root
 * @param {string} attributeName - Nombre del atributo a observar
 * @returns {string|null} - Valor actual del atributo
 */
export function useRootAttribute(attributeName) {
	const [attributeValue, setAttributeValue] = useState(null)

	useEffect(() => {
		// Función para obtener el atributo
		const getAttribute = () => {
			// Intentar primero con el elemento con id="root", luego con document.documentElement
			const rootElement = document.getElementById('root') || document.documentElement

			const value = rootElement?.getAttribute(attributeName)
			return value
		}

		// Establecer valor inicial
		const initialValue = getAttribute()
		setAttributeValue(initialValue)

		// Observer para detectar cambios
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'attributes' && mutation.attributeName === attributeName) {
					const newValue = getAttribute()

					setAttributeValue(newValue)
				}
			})
		})

		// Observar cambios en el elemento root
		const rootElement = document.getElementById('root') || document.documentElement
		if (rootElement) {
			observer.observe(rootElement, {
				attributes: true,
				attributeFilter: [attributeName],
			})
		} else {
			console.warn('⚠️ No se pudo encontrar el elemento root')
		}

		// Cleanup
		return () => {
			observer.disconnect()
		}
	}, [attributeName])

	return attributeValue
}

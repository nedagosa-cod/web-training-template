import { useEffect, useRef } from 'react'

/**
 * Hook personalizado para posicionar dinámicamente los dropdowns de NavigationMenu
 * debajo de sus triggers correspondientes, escapando del overflow del contenedor padre
 */
export function useNavigationMenuPosition() {
	const triggerRef = useRef(null)

	useEffect(() => {
		const updateDropdownPosition = () => {
			if (triggerRef.current) {
				const rect = triggerRef.current.getBoundingClientRect()
				const centerX = rect.left + rect.width / 2

				// Buscar el viewport del navigation menu
				const viewport = document.querySelector('[data-radix-navigation-menu-viewport]')
				if (viewport) {
					viewport.style.setProperty('--trigger-center-x', `${centerX}px`)
				}
			}
		}

		// Función para manejar cuando el trigger se activa
		const handleTriggerInteraction = () => {
			// Pequeño delay para asegurar que el DOM se actualice
			setTimeout(updateDropdownPosition, 10)
		}

		// Actualizar posición cuando el componente se monte
		updateDropdownPosition()

		// Agregar event listeners al trigger
		const triggerElement = triggerRef.current
		if (triggerElement) {
			triggerElement.addEventListener('click', handleTriggerInteraction)
			triggerElement.addEventListener('mouseenter', updateDropdownPosition)
			triggerElement.addEventListener('focus', updateDropdownPosition)
		}

		// Actualizar posición cuando la ventana cambie de tamaño o se haga scroll
		window.addEventListener('resize', updateDropdownPosition)
		window.addEventListener('scroll', updateDropdownPosition)

		return () => {
			if (triggerElement) {
				triggerElement.removeEventListener('click', handleTriggerInteraction)
				triggerElement.removeEventListener('mouseenter', updateDropdownPosition)
				triggerElement.removeEventListener('focus', updateDropdownPosition)
			}
			window.removeEventListener('resize', updateDropdownPosition)
			window.removeEventListener('scroll', updateDropdownPosition)
		}
	}, [])

	return triggerRef
}

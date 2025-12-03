import { useEffect, useState } from 'react'

export default function LEDLine() {
	const [intensity, setIntensity] = useState(0)
	const [primaryColor, setPrimaryColor] = useState()

	useEffect(() => {
		// Obtener el color primary desde las variables CSS
		const root = document.documentElement
		const primaryValue = getComputedStyle(root).getPropertyValue('--primary').trim()

		if (primaryValue) {
			// Convertir el valor HSL (formato: "195 100% 33%") a formato hsl() completo
			const [h, s, l] = primaryValue.split(' ')
			setPrimaryColor(`hsl(${h}, ${s}, ${l})`)
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			setIntensity(prev => (prev + 1) % 100)
		}, 50)

		return () => clearInterval(interval)
	}, [])

	// Función para ajustar la luminosidad del color primary según la intensidad
	const getColorWithIntensity = () => {
		const root = document.documentElement
		const primaryValue = getComputedStyle(root).getPropertyValue('--primary').trim()

		if (!primaryValue) return primaryColor

		const [h, s, baseL] = primaryValue.split(' ')
		const lightness = parseFloat(baseL.replace('%', ''))
		// Ajustar la luminosidad según la intensidad (0-100)
		const adjustedLightness = lightness + intensity / 2 // Aumenta el brillo con la intensidad
		return `hsl(${h}, ${s}, ${Math.min(adjustedLightness, 100)}%)`
	}

	// Función para obtener el color con opacidad para la sombra
	const getShadowColor = () => {
		const root = document.documentElement
		const primaryValue = getComputedStyle(root).getPropertyValue('--primary').trim()

		if (!primaryValue) return primaryColor

		const [h, s, baseL] = primaryValue.split(' ')
		const lightness = parseFloat(baseL.replace('%', ''))
		const adjustedLightness = lightness + intensity / 2
		const opacity = 0.7 + intensity / 300
		return `hsla(${h}, ${s}, ${Math.min(adjustedLightness, 100)}%, ${opacity})`
	}

	return (
		<div className="w-full">
			<div
				className="h-[2px] w-full transition-all duration-300 ease-in-out"
				style={{
					boxShadow: `0 0 ${5 + intensity / 10}px ${2 + intensity / 20}px ${getShadowColor()}`,
					backgroundColor: getColorWithIntensity(),
				}}
			/>
		</div>
	)
}

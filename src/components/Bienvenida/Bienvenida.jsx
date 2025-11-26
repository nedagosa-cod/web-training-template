import { useEffect, useState } from 'react'
import imgBack from '../../assets/images/index/backWelcome.jpg'
import imgBackD from '../../assets/images/index/backWelcome-dark.jpg'
import imgBgLightHalloween from '../../assets/images/index/bg-light-Halloween.jpg'
import imgBgDarkHalloween from '../../assets/images/index/bg-dark-Halloween.jpg'
import imgBgLightNovember from '../../assets/images/index/bg-light-november.jpg'
import imgBgDarkNovember from '../../assets/images/index/bg-dark-november.jpg'
import imgBgLightNavidad from '../../assets/images/index/bg-light-navidad.jpg'
import imgBgDarkNavidad from '../../assets/images/index/bg-dark-navidad.jpg'
import { ImageSlider } from '../WebTraining/noticias'

// Hook para detectar modo oscuro/claro
function useIsDarkMode() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const checkDark = () => {
			setIsDark(document.documentElement.classList.contains('dark'))
		}
		checkDark()
		const observer = new MutationObserver(checkDark)
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
		return () => observer.disconnect()
	}, [])

	return isDark
}

export default function Bienvenida() {
	const isDark = useIsDarkMode()

	const setBackground = () => {
		const month = new Date().getMonth() + 1
		switch (month) {
			case 10:
				return `url(${isDark ? imgBgDarkHalloween : imgBgLightHalloween})`
			case 11:
				return `url(${isDark ? imgBgDarkNovember : imgBgLightNovember})`
			case 12:
				return `url(${isDark ? imgBgDarkNavidad : imgBgLightNavidad})`
			default:
				return `url(${isDark ? imgBackD : imgBack})`
		}
	}
	const style = {
		backgroundImage: setBackground(),
	}
	return (
		<div className="flex items-center w-full h-full bg-center bg-cover text-foreground" style={style}>
			<section className="flex overflow-hidden relative flex-col gap-1 p-1 ml-6 w-2/5 rounded-lg bg-primary">
				<div className="flex items-center justify-center p-2 bg-[hsl(var(--primary-light))]">
					<div className="overflow-hidden relative z-10 w-16 h-12 bg-white rounded-md border border-gray-300 shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
						{/* Cubierta izquierda (simula contenido del libro) */}
						<div className="flex absolute inset-0 z-0 flex-col justify-between px-1 py-1">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="h-[2px] bg-gray-300 dark:bg-neutral-600 w-full rounded" />
							))}
						</div>

						{/* Página animada */}
						<div className="absolute top-0 left-1/2 z-10 px-1 py-1 w-1/2 h-full bg-white rounded-sm border-r border-gray-300 shadow-md origin-left dark:bg-neutral-800 animate-page-flip dark:border-neutral-700">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="h-[2px] bg-gray-300 dark:bg-neutral-600 w-full rounded mb-1" />
							))}
						</div>

						{/* Cubierta derecha (simula otra página) */}
						<div className="absolute top-0 right-0 z-0 px-1 py-1 w-1/2 h-full bg-white dark:bg-neutral-900">
							{[...Array(4)].map((_, i) => (
								<div key={i} className="h-[2px] bg-gray-300 dark:bg-neutral-600 w-full rounded mb-1" />
							))}
						</div>
					</div>
					<div
						className="absolute inset-0 bg-red-200 opacity-50 transition-opacity group-hover:opacity-70"
						style={{
							backgroundImage:
								'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.1) 10px, rgba(255,0,0,0.1) 20px)',
						}}></div>
					<p
						className="relative -top-1 z-10 ml-4 text-5xl font-bold text-white"
						style={{
							fontFamily: 'Arial Black, Gadget, sans-serif',
							textShadow: `
								0 1px 0 #ddd, 
								0 2px 0 #ccc, 
								0 3px 0 #bbb, 
								0 4px 0 #aaa, 
								0 5px 0 #acacac, 
								0 6px 1px rgba(0,0,0,0.1), 
								0 0 5px rgba(0,0,0,0.1), 
								0 1px 3px rgba(0,0,0,0.3), 
								0 3px 5px rgba(0,0,0,0.2), 
								0 5px 10px rgba(0,0,0,0.25), 
								0 10px 10px rgba(0,0,0,0.2), 
								0 20px 20px rgba(0,0,0,0.15)
								`,
						}}>
						NOTICIAS
					</p>
				</div>

				<ImageSlider autoPlayInterval={4000} className="shadow-xl" />
			</section>
		</div>
	)
}

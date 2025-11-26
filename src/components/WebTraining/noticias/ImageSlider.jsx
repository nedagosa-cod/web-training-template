import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import slidesData from '@/data/noticias.json'
import { FullScreenImage } from './components/FullScreenImage'
import { SlideNavigation } from './components/SlideNavigation'

export const ImageSlider = ({ autoPlayInterval = 4000, className }) => {
	const [validSlides, setValidSlides] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const slideTimerRef = useRef(null)

	// Validar existencia de imágenes
	useEffect(() => {
		const validateImages = async () => {
			setIsLoading(true)
			const validImages = []

			for (const slide of slidesData) {
				try {
					// Crear una promesa para verificar si la imagen existe
					const imageExists = await new Promise(resolve => {
						const img = new Image()
						img.onload = () => resolve(true)
						img.onerror = () => resolve(false)
						img.src = `BASES_ClaroSwat/NOTICIAS/${slide.src}`
					})

					if (imageExists) {
						validImages.push(slide)
					}
				} catch (error) {
					console.warn(`Error al verificar imagen ${slide.src}:`, error)
				}
			}

			setValidSlides(validImages)
			setIsLoading(false)

			// Reset currentIndex si es mayor al número de slides válidos
			if (validImages.length > 0) {
				setCurrentIndex(prev => (prev >= validImages.length ? 0 : prev))
			}
		}

		validateImages()
	}, [])

	const goToNextSlide = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % validSlides.length)
	}, [validSlides.length])

	const goToPrevSlide = useCallback(() => {
		setCurrentIndex(prevIndex => (prevIndex === 0 ? validSlides.length - 1 : prevIndex - 1))
	}, [validSlides.length])

	const openFullScreen = () => {
		setIsFullScreen(true)
	}

	const closeFullScreen = () => {
		setIsFullScreen(false)
	}

	// Handle auto-sliding
	useEffect(() => {
		if (isPaused) {
			if (slideTimerRef.current) {
				clearInterval(slideTimerRef.current)
				slideTimerRef.current = null
			}
			return
		}

		slideTimerRef.current = window.setInterval(() => {
			goToNextSlide()
		}, autoPlayInterval)

		return () => {
			if (slideTimerRef.current) {
				clearInterval(slideTimerRef.current)
			}
		}
	}, [autoPlayInterval, goToNextSlide, isPaused])

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = e => {
			if (isFullScreen) return // Don't handle when in fullscreen mode (handled by FullScreenImage)

			if (e.key === 'ArrowLeft') {
				goToPrevSlide()
			} else if (e.key === 'ArrowRight') {
				goToNextSlide()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [goToNextSlide, goToPrevSlide, isFullScreen])

	// Mostrar loader mientras se validan las imágenes
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[50vh] p-4">
				<div className="flex flex-col gap-2 items-center">
					<div className="w-8 h-8 rounded-full border-b-2 animate-spin border-primary"></div>
					<span className="text-muted-foreground">Cargando noticias...</span>
				</div>
			</div>
		)
	}

	// Si no hay imágenes válidas después de la validación
	if (!validSlides.length) {
		return <div className="p-4 text-muted-foreground">No hay imágenes disponibles para mostrar</div>
	}

	return (
		<>
			<div
				className={cn(
					'overflow-hidden relative rounded-lg border border-border',
					'w-full max-w-full h-[50vh]',
					'cursor-pointer group',
					className
				)}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onClick={openFullScreen}>
				{/* Image slides */}
				<div className="relative w-full h-full">
					{validSlides.map((slide, index) => (
						<div
							key={slide.id}
							className={cn(
								'absolute inset-0 h-full w-full transition-opacity duration-700',
								index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
							)}>
							<img
								src={`BASES_ClaroSwat/NOTICIAS/${slide.src}`}
								alt={slide.alt}
								className="object-cover w-full h-full"
							/>
						</div>
					))}
				</div>

				{/* Indicators */}
				<div className="flex absolute bottom-4 left-1/2 z-10 gap-2 -translate-x-1/2">
					{validSlides.map((_, index) => (
						<button
							key={index}
							className={cn(
								'h-2 w-2 rounded-full transition-all duration-300',
								'focus:outline-none focus:ring-2 focus:ring-primary',
								index === currentIndex ? 'bg-primary w-4' : 'bg-primary/60 hover:bg-primary/80'
							)}
							onClick={e => {
								e.stopPropagation()
								setCurrentIndex(index)
							}}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				{/* Navigation buttons */}
				<SlideNavigation onPrev={goToPrevSlide} onNext={goToNextSlide} />
			</div>

			{/* Fullscreen view */}
			<FullScreenImage image={validSlides[currentIndex] || null} isOpen={isFullScreen} onClose={closeFullScreen} />
		</>
	)
}

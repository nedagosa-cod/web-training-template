import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const FullScreenImage = ({ image, isOpen, onClose }) => {
	// Handle ESC key to close the fullscreen view
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
			// Prevent scrolling when modal is open
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!isOpen || !image) return null

	return (
		<div className="flex fixed inset-0 z-50 justify-center items-center p-1 bg-black/90" onClick={onClose}>
			<button
				className={cn(
					'flex absolute top-6 right-6 justify-center items-center w-10 h-10',
					'text-white rounded-full bg-black/50',
					'transition-all duration-200 hover:bg-black/70'
				)}
				onClick={onClose}
				aria-label="Close fullscreen view">
				<X className="w-6 h-6" />
			</button>

			<div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg" onClick={e => e.stopPropagation()}>
				<img
					src={`BASES_XxxXxx/NOTICIAS/${image.src}`}
					alt={image.alt}
					className="h-auto w-full max-h-[90vh] object-contain"
				/>
			</div>
		</div>
	)
}

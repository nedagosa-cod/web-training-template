import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SlideNavigation = ({ onPrev, onNext }) => {
	return (
		<>
			<button
				onClick={e => {
					e.stopPropagation()
					onPrev()
				}}
				className={cn(
					'absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center',
					'h-10 w-10 rounded-full bg-primary/40 text-white',
					'transition-all duration-200 hover:bg-primary/60',
					'focus:outline-none focus:ring-2 focus:ring-primary/50',
					'z-10'
				)}
				aria-label="Previous slide">
				<ChevronLeft className="h-6 w-6" />
			</button>
			<button
				onClick={e => {
					e.stopPropagation()
					onNext()
				}}
				className={cn(
					'absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center',
					'h-10 w-10 rounded-full bg-primary/40 text-white',
					'transition-all duration-200 hover:bg-primary/60',
					'focus:outline-none focus:ring-2 focus:ring-primary/50',
					'z-10'
				)}
				aria-label="Next slide">
				<ChevronRight className="h-6 w-6" />
			</button>
		</>
	)
}

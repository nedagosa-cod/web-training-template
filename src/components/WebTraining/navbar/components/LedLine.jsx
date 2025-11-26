import { useEffect, useState } from 'react'

export default function LEDLine() {
	const [intensity, setIntensity] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIntensity(prev => (prev + 1) % 100)
		}, 50)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="w-full">
			<div
				className="h-[2px] w-full bg-red-600 transition-all duration-300 ease-in-out"
				style={{
					boxShadow: `0 0 ${5 + intensity / 10}px ${2 + intensity / 20}px rgba(220, ${20 + intensity}, ${
						20 + intensity / 2
					}, ${0.7 + intensity / 300})`,
					backgroundColor: `rgb(220, ${20 + intensity}, ${20 + intensity / 2})`,
				}}
			/>
		</div>
	)
}

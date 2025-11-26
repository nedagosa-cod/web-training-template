export default function IconArrowUp({ className }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className}>
			<defs>
				<linearGradient id="miGradiente" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: 'rgb(115,44,100)', stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: 'rgb(0,0,0)', stopOpacity: 1 }} />
				</linearGradient>
			</defs>
			<path
				d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
				fill="url(#miGradiente)"
			/>
		</svg>
	)
}

const IconTheme = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<defs>
				<linearGradient id="setGradiente" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: 'rgb(255,255,255)', stopOpacity: 1 }} />
				</linearGradient>
			</defs>
			<path
				d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
				fill="url(#setGradiente)"
			/>
		</svg>
	)
}

export default IconTheme

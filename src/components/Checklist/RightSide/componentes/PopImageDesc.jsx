//descontinuado
const PopImageDesc = ({ setPopShowImage, imagePop, widthImg }) => {
	return (
		<div
			className="PopImageDesc flex z-500 overflow-hidden justify-center items-center absolute top-0 left-0 w-full h-dvh bg-gray-400 backdrop-blur-sm border border-gray-500"
			onClick={() => {
				setPopShowImage(false)
			}}>
			<figure style={{ width: `${widthImg}` }}>
				{imagePop.length > 100 ? (
					<img src={'data:image/png;base64,' + imagePop} alt="imagen de ayuda" />
				) : (
					<img src={'./noTocar/imagenes/checklist/' + imagePop} alt="imagen de ayuda" />
				)}
			</figure>
		</div>
	)
}

export default PopImageDesc

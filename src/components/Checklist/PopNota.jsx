const PopNota = ({ activePopNota }) => {
	const openClosePopNota = e => {
		if (e.target.className == 'PopNota') {
			activePopNota()
		}
	}
	return (
		<div
			className="PopNota absolute top-0 left-0 overflow-hidden flex flex-col items-center justify-center w-full h-dvh bg-gray-400 z-100 shadow-lg backdrop-blur-sm border border-gray-500"
			onClick={openClosePopNota}>
			<div className="paper">
				<div className="paper-content">
					<section>
						<p>Nota que se vaya a representar</p>
						<p>Dato adicional</p>
						<p>Informacion nueva</p>
						<p>Observaciones</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci at labore voluptatem quasi suscipit
							atque fugit assumenda ut totam ratione? Vero ratione, quasi sequi delectus fugiat inventore esse corrupti
							facere! At rem vitae odit unde illo delectus totam omnis ipsa quaerat velit praesentium accusantium,
							debitis labore temporibus vero doloribus quis qui mollitia facere sequi eum! Repellat sapiente quis
							distinctio cupiditate. Nemo iste, magni a labore sapiente eos facere odit saepe earum architecto
							distinctio nesciunt nihil placeat velit, quae, minima veniam minus dolore dolores aliquam cupiditate
							explicabo eligendi similique.
						</p>
					</section>
				</div>
			</div>
			<div className="papper" draggable="true">
				Copiar nota
			</div>
		</div>
	)
}

export default PopNota

import timer from '../../assets/images/index/timer.png'

const Alarma = ({ soundPlayed, apagarSonido }) => {
	return (
		<>
			{soundPlayed && (
				<div className="cronometro" onClick={() => apagarSonido()}>
					<div className="cronometro__alarma">
						<figure>
							<img src={timer} alt="" />
							<h2>Tiempo cumplido</h2>
						</figure>
						<p>
							Cronometro finalizado, Retoma al cliente por favor <span>(Has click para apagar alarma)</span>
						</p>
					</div>
				</div>
			)}
		</>
	)
}

export default Alarma

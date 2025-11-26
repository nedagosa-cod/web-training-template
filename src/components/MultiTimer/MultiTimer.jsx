import { useContext, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import IconClock from '../../icons/IconClock'
import { Timer } from 'lucide-react'
import GlobalContext from '../../context/GlobalContext.jsx'

const MultiTimer = () => {
	const [isOpen, setIsOpen] = useState(false)

	// FUNCIONALIDAD DEL CRONOMETRO
	// Accedemos a los valores del contexto
	const {
		timers,
		visibleTimers,
		iniciarCronometro, // Obtenemos la función desde el contexto
		reiniciarValores,
		playAlarmSound,
		stopAlarmSound,
	} = useContext(GlobalContext)

	// Función para formatear el tiempo en mm:ss (sin horas)
	const formatTime = seconds => {
		const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
		const secs = String(seconds % 60).padStart(2, '0')
		return `${minutes}:${secs}`
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="p-1 w-8 h-8 bg-white rounded cursor-pointer">
					<Timer className="w-4 h-4 text-primary" />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-center text-2xl font-bold bg-primary text-primary-foreground py-2 px-4 rounded-md">
						Cronómetro
					</DialogTitle>
				</DialogHeader>

				{/* Timers activos */}
				<div className="space-y-4">
					{timers.slice(0, visibleTimers).map((time, index) => (
						<div
							key={index}
							className="flex items-center justify-between bg-gray-300 dark:bg-gray-700 border border-gray-400 rounded-lg p-4 shadow-inner">
							<div className="w-10 h-10 flex items-center justify-center">
								<IconClock className="w-8 h-8 text-gray-600 dark:text-gray-300" />
							</div>
							<div className="text-4xl font-black text-gray-800 dark:text-gray-200 tracking-wider">
								{formatTime(time)}
							</div>
							<div className="w-10 h-10 flex items-center justify-center">
								<IconClock className="w-8 h-8 text-gray-600 dark:text-gray-300" />
							</div>
						</div>
					))}
				</div>

				{/* Controles de timers */}
				<div className="space-y-4 mt-6">
					{[0, 1, 2].map(index => (
						<div key={index} className="flex items-center gap-4 p-2">
							<div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full border-4 border-primary/20 shadow-md">
								<span className="text-sm font-bold">{index + 1}</span>
							</div>

							<label className="text-sm font-medium text-foreground min-w-0 w-20">Timer {index + 1}:</label>

							<Input
								id={`timer-${index}`}
								type="number"
								placeholder="60 Seg"
								className="flex-1 w-full text-center bg-gray-300 dark:bg-gray-700 text-black dark:text-white border-gray-400"
								onInput={e => {
									// Verificar si la longitud del valor es mayor a 2
									if (e.target.value.length > 2) {
										e.target.value = e.target.value.slice(0, 2) // Limitar a los primeros 2 dígitos
									}
								}}
							/>

							<Button
								onClick={() => iniciarCronometro(index)}
								className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all hover:scale-105"
								size="sm">
								Iniciar
							</Button>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="mt-6 pt-4 border-t space-y-3">
					<div className="flex gap-2">
						<Button
							onClick={playAlarmSound}
							variant="outline"
							size="sm"
							className="flex-1 font-bold transition-all hover:scale-105">
							🔊 Probar Alarma
						</Button>
						<Button
							onClick={stopAlarmSound}
							variant="outline"
							size="sm"
							className="flex-1 font-bold transition-all hover:scale-105">
							🔇 Detener
						</Button>
					</div>
					<Button
						onClick={reiniciarValores}
						variant="destructive"
						className="w-full font-bold transition-all hover:scale-105">
						Reiniciar Valores
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default MultiTimer

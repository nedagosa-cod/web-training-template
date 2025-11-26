import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useEffect } from 'react'
import { useRootAttribute } from '../../../../hooks/useRootAttribute'

export default function AdminButton() {
	const activeSession = useRootAttribute('active-session')

	useEffect(() => {
		// Debug: Verificar manualmente el atributo
		const root = document.documentElement || document.getElementById('root')
		// Para pruebas: establecer el atributo si no existe
		if (!activeSession && root) {
			setTimeout(() => {
				root.setAttribute('active-session', 'Usuario de prueba')
			}, 2000)
		}
	}, [activeSession])

	return (
		<div className="flex gap-2">
			{/* Botón de prueba temporal */}
			<Button variant="outline" className="h-8">
				<User className="mr-1 w-4 h-4" />
				{activeSession && `${activeSession.split(' ')[0] + ' ' + activeSession.split(' ')[2]}`}
			</Button>
		</div>
	)
}

import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRootAttribute } from '../../../../hooks/useRootAttribute'

export default function AdminButton() {
	const activeSession = useRootAttribute('active-session')
	const [userAsesor, setUserAsesor] = useState('')

	useEffect(() => {
		// Verificar si hay un usuario guardado en localStorage
		const savedUser = localStorage.getItem('userAsesor')

		if (savedUser && !activeSession) {
			// Si hay un usuario guardado pero no hay sesión activa, restaurar la sesión
			const root = document.documentElement || document.getElementById('root')
			if (root) {
				root.setAttribute('active-session', savedUser)
			}
			setUserAsesor(savedUser)
		} else if (activeSession) {
			// Si hay una sesión activa, actualizar el estado local
			setUserAsesor(activeSession)
		}
	}, [activeSession])

	// Función para formatear el nombre del usuario
	const formatUserName = name => {
		if (!name) return ''
		const parts = name.split(' ')
		if (parts.length >= 3) {
			return `${parts[0]} ${parts[2]}`
		}
		return parts[0] || ''
	}

	return (
		<div className="flex gap-2">
			<Button variant="outline" className="h-8">
				<User className="mr-1 w-4 h-4 text-secondary" />
				{formatUserName(userAsesor || activeSession)}
			</Button>
		</div>
	)
}

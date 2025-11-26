import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function NoteCard({ note, onEdit, onDelete }) {
	const [isHovered, setIsHovered] = useState(false)

	const textColor = getContrastColor(note.color)
	return (
		<Card
			style={{ backgroundColor: note.color }}
			className="transition-all duration-200 hover:shadow-md"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<CardHeader className="pb-2">
				<CardTitle style={{ color: textColor }} className="text-lg font-medium">
					{note.title || 'Sin título'}
				</CardTitle>
				<p className="text-xs opacity-70" style={{ color: textColor }}>
					{note.createdAt ? formatDate(note.createdAt) : 'Ahora'}
				</p>
			</CardHeader>
			<CardContent style={{ color: textColor }}>
				<p className="whitespace-pre-wrap">{note.content}</p>
			</CardContent>
			<CardFooter
				className={`justify-end gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
				<Button
					size="sm"
					variant="outline"
					onClick={() => onEdit(note)}
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						borderColor: 'rgba(0, 0, 0, 0.1)',
						color: textColor,
					}}>
					<Edit className="h-4 w-4" />
				</Button>
				<Button
					size="sm"
					variant="outline"
					onClick={() => onDelete(note.id)}
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						borderColor: 'rgba(0, 0, 0, 0.1)',
						color: textColor,
					}}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	)
}

// Función para determinar si el texto debe ser oscuro o claro según el color de fondo
function getContrastColor(hexColor) {
	// Si no hay color, usar negro
	if (!hexColor) return '#000000'

	// Convertir hex a RGB
	let r = 0,
		g = 0,
		b = 0

	// 3 dígitos
	if (hexColor.length === 4) {
		r = Number.parseInt(hexColor[1] + hexColor[1], 16)
		g = Number.parseInt(hexColor[2] + hexColor[2], 16)
		b = Number.parseInt(hexColor[3] + hexColor[3], 16)
	}
	// 6 dígitos
	else if (hexColor.length === 7) {
		r = Number.parseInt(hexColor.substring(1, 3), 16)
		g = Number.parseInt(hexColor.substring(3, 5), 16)
		b = Number.parseInt(hexColor.substring(5, 7), 16)
	}

	// Calcular luminosidad
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	// Si es claro, usar texto oscuro, si es oscuro, usar texto claro
	return luminance > 0.5 ? '#000000' : '#ffffff'
}

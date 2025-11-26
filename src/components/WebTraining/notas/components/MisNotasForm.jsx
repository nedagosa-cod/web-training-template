import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function NoteForm({ initialNote, onSubmit, onCancel }) {
	const [note, setNote] = useState(initialNote)

	const colorOptions = [
		{ value: '#ffffff', label: 'Blanco' },
		{ value: '#f8d7da', label: 'Rojo claro' },
		{ value: '#d4edda', label: 'Verde claro' },
		{ value: '#cce5ff', label: 'Azul claro' },
		{ value: '#fff3cd', label: 'Amarillo' },
		{ value: '#e2e3e5', label: 'Gris' },
		{ value: '#d1c4e9', label: 'Púrpura' },
		{ value: '#ffccbc', label: 'Naranja' },
	]

	const handleChange = e => {
		const { name, value } = e.target
		setNote({ ...note, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(note)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="title">Título</Label>
				<Input id="title" name="title" value={note.title} onChange={handleChange} placeholder="Título de la nota" />
			</div>

			<div className="space-y-2">
				<Label htmlFor="content">Contenido</Label>
				<Textarea
					id="content"
					name="content"
					value={note.content}
					onChange={handleChange}
					placeholder="Escribe tu nota aquí..."
					rows={5}
					required
				/>
			</div>

			<div className="space-y-2">
				<Label>Color de la nota</Label>
				<div className="flex flex-wrap gap-2">
					{colorOptions.map(color => (
						<button
							key={color.value}
							type="button"
							className={`h-8 w-8 rounded-full border-2 transition-all ${
								note.color === color.value ? 'border-red-600 scale-110' : 'border-gray-300'
							}`}
							style={{ backgroundColor: color.value }}
							onClick={() => setNote({ ...note, color: color.value })}
							title={color.label}
						/>
					))}
				</div>
			</div>

			<div className="flex justify-end space-x-2 pt-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancelar
				</Button>
				<Button type="submit" className="bg-red-600 hover:bg-red-700">
					{initialNote.id ? 'Actualizar' : 'Crear'}
				</Button>
			</div>
		</form>
	)
}

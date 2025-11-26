import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import { Separator } from '@/components/ui/separator'

const SubtitleDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent, deleteChElement, dialogDeleteElement } =
		useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	const showDialogDelete = () => {
		if (deleteChElement && areObjectsEqual(locationEl, { check, location })) {
			return (
				<dialog className="dialog-delete" open>
					<h2>¿Estas seguro que quieres eliminar este elemento?</h2>
					<button type="button" onClick={e => dialogDeleteElement(check, location, updateUserCheck, e)}>
						Aceptar
					</button>
					<button type="button" onClick={e => dialogDeleteElement(check, location, updateUserCheck, e)}>
						Cancelar
					</button>
				</dialog>
			)
		}
		return null
	}
	return (
		<>
			{isEditable ? (
				<input
					className="text-[hsl(var(--primary-dark))] text-center text-xl w-full rounded-md border-2 border-gray-300 bg-gray-100 p-2"
					type="text"
					onBlur={e =>
						HandlerContent({
							type: 'SUBTITLE',
							value: e.target.value,
							editValue: setEditedValue,
							updateUserCheck,
							check,
							location,
						})
					}
					value={editedValue}
					onChange={e => setEditedValue(e.target.value)}
				/>
			) : (
				<div className="flex flex-col items-center justify-center mt-2">
					<h2 className="text-center font-bold text-4xl text-primary ">- {children} -</h2>
					<Separator className="my-2 h-[2px] w-1/2 bg-primary" />
				</div>
			)}
			{showDialogDelete()}
		</>
	)
}

export default SubtitleDesc

import { useContext, useState } from 'react'
import TipTap from '../../../TipTap.jsx/TipTap'
import CheckListContext from '../../../../context/ChecklistContext'
import parse from 'html-react-parser'
const ParagraphDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent, deleteChElement, dialogDeleteElement } =
		useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)

	const getEditorValue = (value, closeEdit) => {
		HandlerContent({
			type: 'P',
			value: value,
			editValue: setEditedValue,
			updateUserCheck,
			check,
			location,
			closeEdit,
		})
	}
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

	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	return (
		<>
			{isEditable ? (
				<>
					<TipTap content={editedValue} getValueTipTap={getEditorValue} onParagraph />
				</>
			) : (
				<span className="text-md w-full">
					{parse(
						children
							.replace(/^<p>/, '') // el tiptap me retorna el html con una <p> de contentedory daña estilos
							.replace(/<\/p>$/, '') // se cambia la <p></p> por ''
							.replace(/<p><\/p>/g, '<br/>') // se cambia el <p></p> por <br/> para crear salto de linea
					)}
				</span>
			)}
			{showDialogDelete()}
		</>
	)
}

export default ParagraphDesc

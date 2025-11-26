import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import LZString from 'lz-string'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

const ImageDesc = ({ img, width, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent, deleteChElement, dialogDeleteElement } =
		useContext(CheckListContext)

	const [nameImg, setNameImg] = useState(img)
	const [editedValue, setEditedValue] = useState(img)
	const [secondValues, setSecondValues] = useState({
		imgWidth: width,
	})
	const getValueTipTap = (event, value, closeEdit) => {
		HandlerContent({
			type: 'IMG',
			value: value,
			editValue: setEditedValue,
			editSecondValues: setSecondValues,
			updateUserCheck,
			check,
			location,
			closeEdit,
			secondValues: {
				imgWidth: event ? event.target.value : secondValues.imgWidth,
			},
		})
	}

	const handleFileChange = event => {
		const file = event.target.files[0]
		if (file) {
			setNameImg(file.name)
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64String = reader.result.split(',')[1]
				setEditedValue(base64String)
				getValueTipTap(false, base64String, false)
			}
			// Read the file as a data URL (base64)
			reader.readAsDataURL(file)
		}
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
	const renderEditor = () => (
		<div className="description__pop-image-container flex flex-wrap items-center justify-center border border-gray-300 rounded-md p-4">
			<i className="description__pop-image"></i>
			<span className="ml-2">{nameImg}</span>
			<div className="w-full">
				<hr />
				<input
					className="w-full text-md"
					type="file"
					onChange={e => {
						handleFileChange(e)
					}}
				/>
				<Separator className="my-2" />
				<label htmlFor="selectImgSize" className="flex justify-between">
					Tamaño de imagen
					<select
						className="border border-gray-300"
						id="selectImgSize"
						value={secondValues.imgWidth}
						onChange={e => {
							getValueTipTap(e, editedValue, false)
						}}>
						{[30, 40, 50, 60, 70, 80, 90].map(size => (
							<option key={size} value={`${size}%`}>
								{size}%
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="description__pop-image-container--buttons">
				<button type="button" onClick={() => getValueTipTap(false, editedValue, true)}>
					Aceptar
				</button>
			</div>
		</div>
	)
	const isEditable = editChElement && areObjectsEqual(locationEl, { check, location })
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="pop-image w-10 h-10 p-5 relative bg-white rounded-md overflow-hidden shadow-md cursor-pointer my-2 border border-primary hover:scale-110 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-7 before:h-7 before:bg-red-500 before:transform before:rotate-45 before:translate-x-1/2 before:translate-y-1/2 before:box-shadow before:shadow-red-700 after:content-[''] after:absolute after:left-2 after:top-2 after:w-3 after:h-3 after:bg-red-500 after:rounded-full after:transform after:rotate-0 after:origin-[35px_145px] hover:bg-white"></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Imagen</DialogTitle>
					<DialogDescription>Imagen de apoyo</DialogDescription>
				</DialogHeader>
				<div>
					{editedValue.length > 100 ? (
						<img src={'data:image/png;base64,' + editedValue} alt="imagen de ayuda" />
					) : (
						<img src={'./noTocar/imagenes/checklist/' + editedValue} alt="imagen de ayuda" />
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ImageDesc

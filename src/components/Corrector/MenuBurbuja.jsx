import { BubbleMenu } from '@tiptap/react'
import { useRef, useState } from 'react'

const MenuBurbuja = ({ editor }) => {
	const [selectedColor, setSelectedColor] = useState('#000000')
	const [selectedHighlightColor, setSelectedHighlightColor] = useState('#FFFFFF')

	const highlightInputRef = useRef(null)
	const colorInputRef = useRef(null)

	const handleOpenColorPicker = () => {
		colorInputRef.current.click()
	}
	const handleColorChange = event => {
		const color = event.target.value
		setSelectedColor(color)
		editor.chain().focus().setColor(color).run()
	}
	const handleOpenHighlightPicker = () => {
		highlightInputRef.current.click()
	}
	const handleHighlightChange = event => {
		const color = event.target.value
		setSelectedHighlightColor(color)
		editor.chain().focus().setHighlight({ color }).run()
	}

	return (
		<BubbleMenu
			editor={editor}
			className="flex items-center space-x-3 bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-md p-2 border border-gray-300"
		>
			{/* Botones de formato */}
			<button
				onMouseDown={e => {
					e.preventDefault()
					editor.chain().focus().toggleBold().run()
				}}
				className={`p-2 rounded-md transition-colors duration-200 ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
					}`}
				aria-label="Bold"
			>
				<i className="ri-bold text-lg"></i>
			</button>

			<button
				onMouseDown={e => {
					e.preventDefault()
					editor.chain().focus().toggleItalic().run()
				}}
				className={`p-2 rounded-md transition-colors duration-200 ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
					}`}
				aria-label="Italic"
			>
				<i className="ri-italic text-lg"></i>
			</button>

			<button
				onMouseDown={e => {
					e.preventDefault()
					editor.chain().focus().toggleStrike().run()
				}}
				className={`p-2 rounded-md transition-colors duration-200 ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
					}`}
				aria-label="Strikethrough"
			>
				<i className="ri-strikethrough text-lg"></i>
			</button>

			<button
				onClick={e => {
					e.preventDefault()
					editor.chain().focus().toggleUnderline().run()
				}}
				className={`p-2 rounded-md transition-colors duration-200 ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
					}`}
				aria-label="Underline"
			>
				<i className="ri-underline text-lg"></i>
			</button>

			{/* Separador */}
			<div className="w-px h-6 bg-gray-300 mx-2"></div>

			{/* Selector color texto */}
			<div
				className={`flex items-center cursor-pointer rounded-md p-1 transition-colors duration-200 ${editor.isActive('textColor') ? 'bg-blue-100' : 'hover:bg-gray-100'
					}`}
				onClick={handleOpenColorPicker}
				title="Seleccionar color"
				role="button"
				tabIndex={0}
				onKeyDown={e => e.key === 'Enter' && handleOpenColorPicker()}
			>
				<i className="ri-palette-line text-xl text-gray-800"></i>
				<input
					type="color"
					ref={colorInputRef}
					value={selectedColor}
					onChange={handleColorChange}
					className="hidden"
				/>
			</div>

			{/* Selector color highlight */}
			<div
				className={`flex items-center cursor-pointer rounded-md p-1 transition-colors duration-200 ${editor.isActive('highlight') ? 'bg-yellow-100' : 'hover:bg-gray-100'
					}`}
				onClick={handleOpenHighlightPicker}
				title="Seleccionar color de resaltado"
				role="button"
				tabIndex={0}
				onKeyDown={e => e.key === 'Enter' && handleOpenHighlightPicker()}
			>
				<i className="ri-mark-pen-line text-xl text-yellow-600"></i>
				<input
					type="color"
					ref={highlightInputRef}
					value={selectedHighlightColor}
					onChange={handleHighlightChange}
					className="hidden"
				/>
			</div>
		</BubbleMenu>
	)
}

export default MenuBurbuja

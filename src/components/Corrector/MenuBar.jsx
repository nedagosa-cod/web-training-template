import { useEffect, useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { toast } from 'sonner'

export default function MenuBar({ editor }) {
	const alignTranslate = {
		center: 'Centrar',
		left: 'Izquierda',
		right: 'Derecha',
		justify: 'Justificado',
	}

	const [listening, setListening] = useState(false)
	const [isHeadingDropdownOpen, setHeadingDropdownOpen] = useState(false)
	const [isListDropdownOpen, setListDropdownOpen] = useState(false)
	const [isJustifyDropdownOpen, setIsJustifyDropdownOpen] = useState(false)
	const [isFontSizeDropdownOpen, setFontSizeDropdownOpen] = useState(false)
	const [isFontFamilyDropdownOpen, setFontFamilyDropdownOpen] = useState(false)
	const [nameFontFamily, setNameFontFamily] = useState('font-Ubuntu')
	const [nameFontSize, setNameFontSize] = useState('14px')
	const [nameTextAlign, setNameTextAlign] = useState('Izquierda')
	const [selectedColor, setSelectedColor] = useState('#000000')
	const [selectedHighlightColor, setSelectedHighlightColor] = useState('#FFFFFF')

	const FontFamilyRef = useRef(null)
	const fontSizeDropdownRef = useRef(null)
	const highlightInputRef = useRef(null)
	const colorInputRef = useRef(null)
	const justifyDropdownRef = useRef(null)

	const closeAllDropdowns = () => {
		setHeadingDropdownOpen(false)
		setListDropdownOpen(false)
		setFontSizeDropdownOpen(false)
		setIsJustifyDropdownOpen(false)
		setFontFamilyDropdownOpen(false)
	}

	const handleClickOutside = e => {
		if (
			![
				FontFamilyRef.current,
				fontSizeDropdownRef.current,
				highlightInputRef.current,
				colorInputRef.current,
				justifyDropdownRef.current,
			].some(ref => ref?.contains(e.target))
		) {
			closeAllDropdowns()
		}
	}

	const setFontSize = size => {
		editor.chain().focus().setFontSize(`${size}px`).run()
		setNameFontSize(`${size}px`)
		setFontSizeDropdownOpen(false)
	}

	const setFontFamily = family => {
		editor.chain().focus().setFontFamily(family).run()
		setNameFontFamily(family)
		setFontFamilyDropdownOpen(false)
	}

	const handleColorChange = e => {
		const color = e.target.value
		setSelectedColor(color)
		editor.chain().focus().setColor(color).run()
	}

	const handleHighlightChange = e => {
		const color = e.target.value
		setSelectedHighlightColor(color)
		editor.chain().focus().setHighlight({ color }).run()
	}

	const setAlign = align => {
		setNameTextAlign(alignTranslate[align])
		editor.chain().focus().setTextAlign(align).run()
		setIsJustifyDropdownOpen(false)
	}

	const startRecognition = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		if (!SpeechRecognition) {
			alert('El reconocimiento de voz no es compatible con este navegador.')
			return
		}

		const recognition = new SpeechRecognition()
		recognition.lang = 'es-ES'
		recognition.interimResults = false
		recognition.maxAlternatives = 1
		recognition.start()
		setListening(true)

		recognition.onresult = event => {
			const text = event.results[0][0].transcript
			editor.chain().focus().insertContent(text).run()
		}

		recognition.onend = () => setListening(false)
		recognition.onerror = () => setListening(false)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(editor.getText()).then(() => toast.success('Copiado al portapapeles'))
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	if (!editor) return null

	const baseBtn = 'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
	const activeBtn = 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white'

	return (
		<div className="flex flex-wrap gap-2 justify-center p-3 rounded-xl border-b border-gray-300 shadow-sm dark:border-gray-700 bg-background">
			{/* Formatting Buttons */}
			{[
				{ cmd: 'toggleBold', icon: 'ri-bold', active: editor.isActive('bold') },
				{ cmd: 'toggleItalic', icon: 'ri-italic', active: editor.isActive('italic') },
				{ cmd: 'toggleStrike', icon: 'ri-strikethrough', active: editor.isActive('strike') },
				{ cmd: 'toggleUnderline', icon: 'ri-underline', active: editor.isActive('underline') },
			].map(({ cmd, icon, active }) => (
				<button
					key={cmd}
					onClick={() => editor.chain().focus()[cmd]().run()}
					className={`p-2 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700 ${
						active ? 'text-blue-600 bg-blue-100 dark:bg-blue-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'
					}`}>
					<i className={`text-lg ${icon}`}></i>
				</button>
			))}

			{/* Color Picker */}
			{[
				{ ref: colorInputRef, handler: handleColorChange, color: selectedColor, icon: 'ri-palette-line' },
				{
					ref: highlightInputRef,
					handler: handleHighlightChange,
					color: selectedHighlightColor,
					icon: 'ri-mark-pen-line',
				},
			].map(({ ref, handler, color, icon }, idx) => (
				<div key={idx} className="relative">
					<button
						onClick={() => ref.current.click()}
						className="p-2 text-gray-700 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200">
						<i className={`text-lg ${icon}`}></i>
					</button>
					<input
						type="color"
						ref={ref}
						value={color}
						onChange={handler}
						className="absolute top-0 left-0 w-0 h-0 opacity-0"
					/>
				</div>
			))}

			{/* Dropdowns */}
			{[
				{
					name: nameFontFamily.split('-')[1],
					isOpen: isFontFamilyDropdownOpen,
					toggle: () => setFontFamilyDropdownOpen(prev => !prev),
					ref: FontFamilyRef,
					list: [
						'font-Arial',
						'font-Verdana',
						'font-Helvetica',
						'font-Tahoma',
						'font-Georgia',
						'font-TimesNewRoman',
						'font-CourierNew',
						'font-TrebuchetMS',
						'font-ComicSansMS',
						'font-Impact',
						'font-Ubuntu',
					],
					onClick: setFontFamily,
				},
				{
					name: nameFontSize,
					isOpen: isFontSizeDropdownOpen,
					toggle: () => setFontSizeDropdownOpen(prev => !prev),
					ref: fontSizeDropdownRef,
					list: [12, 14, 16, 18, 24, 32, 48].map(size => `${size}px`),
					onClick: size => setFontSize(parseInt(size)),
				},
				{
					name: nameTextAlign,
					isOpen: isJustifyDropdownOpen,
					toggle: () => setIsJustifyDropdownOpen(prev => !prev),
					ref: justifyDropdownRef,
					list: ['left', 'center', 'right', 'justify'],
					onClick: setAlign,
					translate: alignTranslate,
				},
			].map(({ name, isOpen, toggle, ref, list, onClick, translate }, i) => (
				<div key={i} className="relative" ref={ref}>
					<button
						onClick={toggle}
						className="flex gap-1 items-center p-2 text-gray-700 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200">
						<span className="text-sm">{name}</span>
						<i className="ri-arrow-down-s-line text-md"></i>
					</button>
					{isOpen && (
						<div className="overflow-hidden absolute z-20 mt-2 w-40 bg-white rounded-md border border-gray-300 shadow-lg dark:bg-gray-800 dark:border-gray-600 animate-fade-in">
							{list.map((item, idx) => (
								<button
									key={idx}
									onClick={() => onClick(item)}
									className="px-4 py-2 w-full text-sm text-left transition hover:bg-gray-100 dark:hover:bg-gray-700">
									{translate ? translate[item] : item.split('-')[1] || item}
								</button>
							))}
						</div>
					)}
				</div>
			))}

			{/* Mic */}
			<button
				onClick={startRecognition}
				className={`p-2 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 ${
					listening ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'
				}`}>
				<i className="text-lg ri-mic-line"></i>
			</button>

			{/* Copy */}
			<button
				onClick={handleCopy}
				className="p-2 text-gray-700 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200">
				<i className="text-lg ri-file-copy-line"></i>
			</button>
		</div>
	)
}

import { useContext, useEffect, useRef, useState } from 'react'
import CheckListContext from '../../../context/ChecklistContext'
import IconEdit from '../../../icons/IconEdit'
import GlobalContext from '../../../context/GlobalContext'
import { toast } from 'sonner'
const ListCheck = ({ check, title, updateCheck, data }) => {
	const {
		checkSelected,
		changeDescription,
		relativePosition,
		resetList,
		hover,
		posHover,
		refRightSide,
		refListCheck,
		isJumping,
		setIsJumping,
		scrollReached,
		setScrollReached,
	} = useContext(CheckListContext)
	const { admin, setAdmin } = useContext(GlobalContext)
	const [showScrollDialog, setShowScrollDialog] = useState(false)
	const [stepTitle, setStepTitle] = useState(title)
	const [listChecked, setListChecked] = useState('')
	const [edit, setEdit] = useState(stepTitle === 'XXXXX' ? true : false)
	const inputCheck = useRef()

	const showRelativeDescription = e => {
		const relativeDescription = () => {
			refRightSide.current.scrollTo({ top: 0, behavior: 'smooth' })
			if (e.target.checked) {
				setListChecked('checked')
				return relativePosition[check][0]
			} else {
				e.target.parentNode.parentNode.parentNode.classList.remove('checked')
				setListChecked('')
				return relativePosition[check][1]
			}
		}
		// Obtiene los datos del paso actual basado en el valor de `check`
		const currentStepData = data.find(desc => desc.check === check)
		// Verifica si el paso actual requiere hacer scroll hasta el final para continuar
		const endScroll = currentStepData?.ENDSCRROLL === 'true'
		// Verifica si el paso ya ha sido marcado como completado
		const pasoCompletado = listChecked === 'checked'
		// se bloquea el avance si alguna de estas se cumple
		if (endScroll && !scrollReached && !pasoCompletado) {
			// alerta que le robe a nestor :V
			toast.error('Debes leer todo el contenido', {
				description: 'Para continuar al siguiente paso, primero debes leer completamente la información mostrada.',
			})
			e.preventDefault()
			return
		}

		if (relativePosition[check].includes(checkSelected)) {
			changeDescription(relativeDescription())
		} else {
			e.target.checked = !e.target.checked
		}
	}
	const createStep = valor => {
		updateCheck(prevState => ({
			...prevState,
			DESCRIPCIONES: prevState.DESCRIPCIONES.map(desc => {
				if (desc.check === check) {
					return {
						...desc,
						html: desc.html.map(
							item => (item.TITULO ? { ...item, TITULO: valor } : item) // Actualiza solo el objeto que tiene TITULO
						),
					}
				} else {
					return desc
				}
			}),
		}))
	}
	useEffect(() => {
		setListChecked('')
		setIsJumping([])
		inputCheck.current.checked = false
		inputCheck.current.parentNode.parentNode.parentNode.classList.remove('checked')
		const adminInputText = document.getElementById('inputText')
		if (adminInputText && admin) {
			adminInputText.focus()
		}
	}, [resetList, edit])
	// Cuando un paso (check) se encuentra dentro de isJumping, se marca visualmente como "checked"
	useEffect(() => {
		if (isJumping.includes(check)) {
			setListChecked('checked')
		}
	}, [isJumping, check])
	useEffect(() => {
		setScrollReached(false)
	}, [checkSelected])
	return (
		<li
			className="relative none flex w-11/12 hover:scale-105 transition-all duration-300 rounded-lg"
			style={{
				backgroundColor: listChecked ? 'rgba(193, 193, 193, 1)' : 'transparent',
				color: listChecked ? 'rgba(143, 143, 143, 1)' : 'rgba(0, 0, 0, 1)',
				boxShadow: listChecked
					? 'rgba(0, 0, 0, 1) 0px 0px 4px -2px inset, rgba(0, 0, 0, 0.3) 0px 0px 10px -2px inset'
					: 'none',
			}}>
			{admin && (
				<label
					htmlFor="inputText"
					onClick={() => {
						setEdit(true)
					}}>
					<IconEdit className={admin ? 'admin svg-edit' : 'admin off'} />
				</label>
			)}
			<label
				style={{
					backgroundColor: posHover === check ? 'rgba(187, 255, 187, 0.5)' : 'transparent',
					transform: posHover === check ? 'scale(1.01)' : '',
				}}
				className={
					'w-full font-sm border-b border-gray-200 justify-between items-center flex cursor-pointer px-2 py-1 rounded-lg '
				}>
				<span
					className="text-3xl text-primary font-bold"
					style={{ color: listChecked ? 'rgba(143, 143, 143, 1)' : '' }}>
					{check}
					{')'}
				</span>
				{stepTitle === 'XXXXX' || edit ? (
					<input
						type="text"
						placeholder="Asignar titulo del paso"
						className={admin ? 'admin input-step' : 'admin off'}
						id="inputText"
						value={stepTitle}
						onChange={e => setStepTitle(e.target.value)}
						onBlur={e => {
							setEdit(false)
							createStep(e.target.value)
						}}
						onKeyUp={e => {
							if (e.key === 'Enter') {
								setEdit(false)
								setStepTitle(e.target.value)
								createStep(e.target.value)
							}
						}}
					/>
				) : (
					<h2 className="text-center text-lg">{title}</h2>
				)}
				<label className="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						value=""
						className="sr-only peer"
						ref={inputCheck}
						onChange={showRelativeDescription}
						id={check}
						checked={listChecked === 'checked'}
					/>
					{/* <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-8 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0"></div> */}
					<div
						className={`peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-500 w-8 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0
		${listChecked === 'checked' ? 'bg-emerald-500 after:content-["✔"] after:rotate-0' : ''}
	`}></div>
				</label>
			</label>
		</li>
	)
}

export default ListCheck

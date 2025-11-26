import React, { useContext } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import { BtnZum } from '../../../MyComponents/Buttons/Buttons'

const ChangeSteep = ({ children, to }) => {
	const { changeDescription, refListCheck, configHover, refRightSide, setIsJumping } = useContext(CheckListContext)

	const jumpToListCheck = () => {
		let ListCheck = refListCheck.current.querySelectorAll('input[type="checkbox"]')
		let end = false
		let marked = [] // array par guardar todos los pasos marcados anteriores al destino osea to
		ListCheck.forEach(element => {
			if (element.id == to) {
				element.checked = false
				end = true
			} else if (!end) {
				element.click()
				marked.push(element.id) // Guardamos todos los pasos marcados
				refRightSide.current.scrollTo({ top: 0, behavior: 'smooth' })
			}
		})
		// Guardamos todos los pasos marcados hasta llegar al destino de forma forzada osea con este componente y no natural
		setIsJumping(prev => Array.from(new Set([...prev, ...marked])))
		changeDescription(to)
	}

	return (
		<div>
			<BtnZum
				className=""
				onClick={jumpToListCheck}
				onMouseEnter={() => configHover('hover', to)}
				onMouseLeave={() => configHover('', '')}>
				{children}
			</BtnZum>
		</div>
	)
}

export default ChangeSteep

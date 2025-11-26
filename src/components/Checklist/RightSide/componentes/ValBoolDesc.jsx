import { useContext, useEffect, useState } from 'react'
import 'animate.css'
import CheckListContext from '../../../../context/ChecklistContext'
import { Card, CardContent } from '@/components/ui/card'

const ValBoolDesc = ({ children, title, position, finish, to, value = '', onChange }) => {
	const { activeInside, updateActiveInside, resetList, refListCheck, refRightSide, changeDescription } =
		useContext(CheckListContext)

	const [optSelected, setOptSelected] = useState('custom')
	const [showSubEl, SetshowSubEl] = useState(false)

	const validateFinish = respuesta => {
		if (respuesta == finish) {
			let ListCheck = refListCheck.current.querySelectorAll('input[type="checkbox"]')
			let end = false
			let letter = String.fromCharCode(65 + to)
			ListCheck.forEach(element => {
				if (element.id == letter) {
					element.checked = false
					end = true
				} else if (element.id != letter && !end) {
					element.parentNode.parentNode.parentNode.classList.add('checked')
					element.checked = true
					refRightSide.current.scrollTo({ top: 0, behavior: 'smooth' })
				}
			})
			changeDescription(letter)
		}
	}

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			validateFinish(e.target.value)
			setOptSelected(e.target.value)
			SetshowSubEl(true)
			updateActiveInside(position, e.target.value, title)
			if (onChange) {
				onChange(e.target.value)
			}
		}
	}

	const startAnimated = () => {
		let result = ''
		activeInside.forEach(valData => {
			if (valData.id == position) {
				result = 'animate__slideInDown animate__faster'
			}
		})
		return result
	}

	useEffect(() => {
		SetshowSubEl(false)
		setOptSelected('custom')
	}, [resetList])

	return (
		<>
			<Card className="flex w-full justify-between items-center bg-[hsl(var(--secondarywt))] p-2 rounded-xl text-center border border-primary-dark shadow-md relative">
				<span className="absolute -top-1 -right-1 flex size-3">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
					<span className="relative inline-flex size-3 rounded-full bg-primary"></span>
				</span>
				<span className="text-white text-lg">
					<strong>{position}.</strong> {title}
				</span>
				<div className="flex items-center justify-around w-2/5">
					<label className="flex gap-2 font-bold text-white text-lg">
						SI
						<input
							type="radio"
							name={'valtext_' + position}
							value="SI"
							onChange={getData}
							checked={optSelected === 'SI'}
						/>
					</label>
					<label className="flex gap-2 font-bold text-white text-lg">
						NO
						<input
							type="radio"
							name={'valtext_' + position}
							value="NO"
							onChange={getData}
							checked={optSelected === 'NO'}
						/>
					</label>
					<label style={{ display: 'none' }}>
						<input
							type="radio"
							name={'valtext_' + position}
							value="custom"
							onChange={getData}
							checked={optSelected === 'custom'}
						/>
					</label>
				</div>
			</Card>
			{showSubEl && (
				<section
					className={
						'flex flex-col items-center justify-center text-lg p-2  gap-2 w-full shadow-md bg-sky-200 relative  rounded-lg animate__animated ' +
						startAnimated()
					}>
					{' '}
					{children}
				</section>
			)}
		</>
	)
}

export default ValBoolDesc

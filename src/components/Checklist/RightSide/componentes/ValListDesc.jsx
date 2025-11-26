import { useContext, useEffect, useState } from 'react'
import IconArrowDown from '../../../../icons/IconArrowDown'
import CheckListContext from '../../../../context/ChecklistContext'
import { ArrowDownIcon } from 'lucide-react'

const ValListDesc = ({ children, position, list, title, onChange }) => {
	const { activeInside, updateActiveInside, resetList } = useContext(CheckListContext)
	const [showList, setShowList] = useState(false)
	const [valueList, setValueList] = useState('')

	const changeValueList = e => {
		const selectedValue = e.target.textContent
		setValueList(e.target.textContent)
		setShowList(false)
		updateActiveInside(position, e.target.textContent, title)
		if (onChange) {
			onChange(selectedValue)
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
		setShowList(false)
		setValueList('')
	}, [resetList])

	return (
		<>
			<div className="flex flex-col w-full justify-between items-center bg-[hsl(var(--secondarywt))] p-2 rounded-xl text-center border border-primary-dark shadow-md relative">
				<span className="absolute -top-1 -right-1 flex size-3">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
					<span className="relative inline-flex size-3 rounded-full bg-primary"></span>
				</span>
				<span className="text-white text-lg">
					<strong>{position}.</strong> {title}
				</span>
				<div className="relative w-4/5 flex flex-col ">
					<label className=" flex items-center justify-between outline-none bg-white p-2 rounded-xl border border-primary-dark">
						<input
							readOnly
							value={valueList}
							placeholder="Seleccion opción..."
							type="text"
							className="w-full outline-none"
							onFocus={() => {
								setShowList(true)
							}}
							onBlur={() => {
								setTimeout(() => {
									setShowList(false)
								}, 100)
							}}
							onChange={e => {
								setValueList(e.target.value)
							}}
						/>
						<ArrowDownIcon className="w-4 h-4" />
					</label>

					{showList && (
						<ul
							className="py-1 px-2 flex-col bg-[hsl(var(--secondarywt))] top-full left-auto absolute list-none w-full rounded-lg shadow-md"
							style={{ zIndex: 100 }}>
							<li className="py-1 text-accent">Seleccion opción...</li>
							{list.map((liData, i) => {
								return (
									<li
										key={i}
										onMouseDown={changeValueList}
										className="hover:bg-[hsl(var(--primarywt))] p-1 rounded-sm cursor-pointer">
										<p className="select-none pointer-events-none text-white">{liData}</p>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
			{valueList && (
				<section
					className={
						'flex flex-col items-center justify-center text-lg p-2  gap-2 w-full shadow-md bg-sky-200 relative  rounded-lg animate__animated ' +
						startAnimated()
					}>
					{children}
				</section>
			)}
		</>
	)
}

export default ValListDesc

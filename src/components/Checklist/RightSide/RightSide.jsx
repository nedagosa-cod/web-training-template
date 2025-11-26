import { useContext, useEffect, useRef, useState } from 'react'
import './styles.scss'
import CheckListContext from '../../../context/ChecklistContext'
import GlobalContext from '../../../context/GlobalContext'
import { IconPlus } from '../../../icons/IconPlus'

const RightSide = ({ descripciones }) => {
	const { checkSelected, refRightSide } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)
	const [data, setData] = useState([])
	const divInternoRef = useRef(null)
	useEffect(() => {
		setData(descripciones)
	}, [descripciones])

	useEffect(() => {
		if (divInternoRef?.current) {
			requestAnimationFrame(() => {
				divInternoRef.current.children[1].scrollTop = 0
			})
		}
	}, [checkSelected])

	return (
		<div
			// style={{
			// 	display: !admin ? 'flex' : 'none',
			// }}
			className={cn('relative w-1/2', admin ? 'hidden' : 'flex')}
			id="rightSide"
			ref={refRightSide}>
			{data.map((descripcion, i) => {
				return (
					<div
						ref={checkSelected == descripcion.check ? divInternoRef : null}
						style={{
							display: checkSelected == descripcion.check || admin ? 'flex' : 'none',
						}}
						key={descripcion.check}
						className={'relative flex flex-col items-center h-full gap-2'}>
						{descripcion.html()}
					</div>
				)
			})}
		</div>
	)
}

export default RightSide

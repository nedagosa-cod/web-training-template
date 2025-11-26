import { useContext, useEffect, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'

const InsideAnswer = ({ children, position, answer, finish }) => {
	const { activeInside } = useContext(CheckListContext)
	const [active, setActive] = useState(false)

	// funcion que se ejecuta despues de guardarse la rta desde ValBoolDesc
	const waitInside = () => {
		activeInside.forEach(valData => {
			if (valData.id == position) {
				if (valData.active == answer) {
					setActive(true)
				} else {
					setActive(false)
				}
			}
		})
	}

	useEffect(() => {
		waitInside()
	}, [activeInside])

	if (active) {
		return <>{children}</>
	}
}
export default InsideAnswer

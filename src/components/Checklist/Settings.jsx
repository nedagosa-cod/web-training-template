import { useContext, useState } from 'react'
import IconDarkLight from '../../icons/IconDarkLight'
import IconGear from '../../icons/IconGear'
import IconWindowComplete from '../../icons/IconWindowComplete'
import CheckListContext from '../../context/ChecklistContext'

export const Settings = ({ zoomChecklist }) => {
	const [activeSettings, setActiveSettings] = useState(false)
	const { changeTheme, theme } = useContext(CheckListContext)

	const openSettings = () => {
		setActiveSettings(!activeSettings)
	}

	return (
		<ul className={'settings ' + activeSettings + ' ' + theme}>
			<li className="settings__list" onClick={openSettings}>
				<IconGear />
				<span>AJUSTES</span>
			</li>
			<li
				className="settings__list"
				onClick={() => {
					zoomChecklist()
				}}>
				<IconWindowComplete />
				<span>Pantalla Completa</span>
			</li>
		</ul>
	)
}

import { useContext, useState } from 'react'
import GlobalContext from '../../../context/GlobalContext'
import IconEdit from '../../../icons/IconEdit'
import CheckListContext from '../../../context/ChecklistContext'

const MenuEdit = ({ children, check, location }) => {
	const { admin } = useContext(GlobalContext)
	const { setEditChElement, setLocationEl, setDeleteChElement } = useContext(CheckListContext)

	const [open, setOpen] = useState(false)

	const openDropMenu = () => {
		setOpen(prev => !prev)
	}
	const handlerDropMenu = key => {
		switch (key) {
			case '1':
				setOpen(false)
				setEditChElement(true)
				setLocationEl({ check, location })
				break
			case '2':
				console.log(key)
				break
			case '3':
				setOpen(false)
				setDeleteChElement(true)
				setLocationEl({ check, location })
				break
		}
	}
	const items = [
		{
			key: '1',
			label: <span>Editar elemento</span>,
		},
		{
			key: '2',
			label: <span>Cambiar elemento</span>,
		},
		{
			key: '3',
			label: <span>Eliminar elemento</span>,
			danger: true,
		},
	]
	return (
		<>
			{children && (
				<div
					className={'flex items-center justify-center w-full relative flex-col'}
					style={{
						marginLeft: !admin ? '' : '3rem',
						width: !admin ? '' : '95%',
						padding: !admin ? '' : '6px 10px',
					}}>
					{admin && children && (
						<button
							className="absolute opacity-40 -left-4 top-1/2 w-7 max-w-7 flex-grow min-w-7 color-primary h-max bg-primary rounded-full -translate-y-1/2 hover:opacity-100"
							type="button"
							onClick={() => {
								openDropMenu()
							}}>
							<IconEdit />
						</button>
					)}
					{children}
					{open && (
						<div className="dropmenu">
							{items.map(item => (
								<div
									key={item.key}
									onClick={() => handlerDropMenu(item.key)}
									className={'dropmenu__handler' + (item.danger ? ' danger' : '')}>
									{item.label}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default MenuEdit

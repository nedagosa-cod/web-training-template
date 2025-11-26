import { useContext, useRef, useState } from 'react'
import GlobalContext from '../../../../context/GlobalContext'
import IconMenu from '../../../../icons/IconMenu'
import CheckListContext from '../../../../context/ChecklistContext'
import TipTap from '../../../TipTap.jsx/TipTap'
import parse from 'html-react-parser'

const ListDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
	const ulEdit = useRef(null)
	const getValueTipTap = (value, closeEdit) => {
		HandlerContent({
			type: 'LIST',
			value: value,
			editValue: setEditedValue,
			updateUserCheck,
			check,
			location,
			closeEdit,
		})
	}
	return (
		<>
			{editChElement &&
			areObjectsEqual(locationEl, {
				check,
				location,
			}) ? (
				<TipTap content={ulEdit.current.innerHTML} getValueTipTap={getValueTipTap} onList />
			) : (
				<ul className="text-md list-disc w-1/2 m-auto flex flex-col mt-4" ref={ulEdit}>
					{Array.isArray(editedValue) ? (
						editedValue.map((item, i) => (
							<li dangerouslySetInnerHTML={{ __html: item.props.dangerouslySetInnerHTML.__html }} key={i} />
						))
					) : (
						<>{parse(editedValue.replace(/<\/?ul>/g, '').replace(/<\/?p>/g, ''))}</>
					)}
				</ul>
			)}
		</>
	)
}

export default ListDesc

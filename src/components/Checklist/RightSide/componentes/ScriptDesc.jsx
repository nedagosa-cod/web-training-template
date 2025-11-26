import { useContext, useEffect, useRef, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import TipTap from '../../../TipTap.jsx/TipTap'
import parse from 'html-react-parser'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { copyClipBoard } from '@/lib/copyClipBoard'

const ScriptDesc = ({ children, check, location, updateUserCheck }) => {
	const { editChElement, locationEl, areObjectsEqual, HandlerContent } = useContext(CheckListContext)
	const [editedValue, setEditedValue] = useState(children)
	const scripEdit = useRef(null)
	const getValueTipTap = (value, closeEdit) => {
		HandlerContent({
			type: 'SCRIPTS',
			value: value,
			editValue: setEditedValue,
			updateUserCheck,
			check,
			location,
			closeEdit,
		})
	}

	return (
		<Card
			className="flex flex-col items-center justify-center bg-sky-100 rounded-full py-2 px-4 cursor-pointer font-bold border border-blue-500 w-full shadow-md hover:shadow-lg my-4"
			onClick={() => copyClipBoard(scripEdit.current.innerText)}>
			<CardContent className="w-full flex flex-col items-center p-0">
				<svg
					viewBox="0 0 1024 1024"
					className="w-10 icon"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					fill="#000000">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M213.333333 554.666667m-85.333333 0a85.333333 85.333333 0 1 0 170.666667 0 85.333333 85.333333 0 1 0-170.666667 0Z"
							fill="#FFA726"></path>
						<path
							d="M810.666667 554.666667m-85.333334 0a85.333333 85.333333 0 1 0 170.666667 0 85.333333 85.333333 0 1 0-170.666667 0Z"
							fill="#FFA726"></path>
						<path
							d="M832 405.333333c0-270.933333-640-177.066667-640 0v213.333334c0 177.066667 142.933333 320 320 320s320-142.933333 320-320V405.333333z"
							fill="#FFB74D"></path>
						<path
							d="M512 64C311.466667 64 149.333333 226.133333 149.333333 426.666667v72.533333L192 533.333333v-64l448-209.066666 192 209.066666v64l42.666667-34.133333V426.666667c0-170.666667-121.6-362.666667-362.666667-362.666667z"
							fill="#FF5722"></path>
						<path
							d="M661.333333 554.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
							fill="#784719"></path>
						<path
							d="M362.666667 554.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
							fill="#784719"></path>
						<path
							d="M917.333333 512c-12.8 0-21.333333 8.533333-21.333333 21.333333v-149.333333c0-187.733333-153.6-341.333333-341.333333-341.333333h-149.333334c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333h149.333334c164.266667 0 298.666667 134.4 298.666666 298.666667v213.333333c0 12.8 8.533333 21.333333 21.333334 21.333334s21.333333-8.533333 21.333333-21.333334v42.666667c0 83.2-66.133333 149.333333-149.333333 149.333333H512c-12.8 0-21.333333 8.533333-21.333333 21.333334s8.533333 21.333333 21.333333 21.333333h234.666667c106.666667 0 192-85.333333 192-192v-106.666667c0-12.8-8.533333-21.333333-21.333334-21.333333z"
							fill="#757575"></path>
						<path
							d="M917.333333 469.333333h-21.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667v85.333333c0 23.466667 19.2 42.666667 42.666667 42.666667h21.333333c23.466667 0 42.666667-19.2 42.666667-42.666667v-85.333333c0-23.466667-19.2-42.666667-42.666667-42.666667z"
							fill="#37474F"></path>
						<path
							d="M512 810.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
							fill="#37474F"></path>
					</g>
				</svg>
				<Separator className="bg-blue-500 my-1 w-3/4" />
				{editChElement &&
				areObjectsEqual(locationEl, {
					check,
					location,
				}) ? (
					<TipTap
						content={scripEdit.current.innerHTML.replace('<br>', '<p></p>')}
						getValueTipTap={getValueTipTap}
						onScript
					/>
				) : (
					<div ref={scripEdit}>
						{Array.isArray(editedValue) ? (
							editedValue.map((text, i) => (
								<p
									className="text-md font-normal italic text-center"
									key={i}
									dangerouslySetInnerHTML={{
										__html: text.props.dangerouslySetInnerHTML.__html.replace(/<p><\/p>/g, '<br/>'),
									}}
								/>
							))
						) : (
							<>{parse(editedValue.replace(/<p><\/p>/g, '<br/>'))}</>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default ScriptDesc

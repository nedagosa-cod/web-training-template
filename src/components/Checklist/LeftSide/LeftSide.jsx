import { useContext } from 'react'
import ListCheck from './ListCheck'
import CheckListContext from '../../../context/ChecklistContext'
import { IconPlus } from '../../../icons/IconPlus'
import GlobalContext from '../../../context/GlobalContext'
import { Separator } from '@/components/ui/separator'

const LeftSide = ({ title, data, updateCheck }) => {
	const { refListCheck, relativePosition, posHover } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)

	const createStep = () => {
		updateCheck(prevState => ({
			...prevState,
			DESCRIPCIONES: [
				...data,
				{ check: relativePosition[data[data.length - 1].check][0], html: [{ TITULO: 'XXXXX' }] },
			],
		}))
	}

	return (
		<div className="flex flex-col items-center gap-8 w-1/2 border-r border-gray-200 px-2 py-4">
			<h2
				style={{
					WebkitBackgroundClip: 'text',
					MozBackgroundClip: 'text',
					textShadow: '0px 2px 2px rgba(255,255,255,0.3),0px -1px 1px rgba(0,0,0,0.3)',
				}}
				className="text-4xl text-center bg-primary text-transparent text-shadow-lg font-bold">
				{title}
			</h2>
			<Separator className="w-11/12" />
			<ul
				className="flex flex-col scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200 items-center overflow-y-auto h-full w-full gap-2"
				ref={refListCheck}>
				{data.map((paso, i) => {
					return (
						<ListCheck check={paso.check} title={paso.html[0].TITULO} key={i} updateCheck={updateCheck} data={data} />
					)
				})}
				{admin && (
					<li className={'admin ' + 'on' + ' add-check'} onClick={() => createStep()}>
						<IconPlus />
					</li>
				)}
			</ul>
		</div>
	)
}

export default LeftSide

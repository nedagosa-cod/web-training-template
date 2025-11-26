import { useContext } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const ValTextDesc = ({ children, position, onChange }) => {
	const { updateActiveInside } = useContext(CheckListContext)

	const getData = e => {
		if (e.target.nodeName == 'INPUT') {
			updateActiveInside(position, e.target.value, children)
			if (onChange) {
				onChange(e.target.value)
			}
		}
	}

	return (
		<Card className="flex w-full justify-center items-center bg-[hsl(var(--secondarywt))] p-2 rounded-xl text-center border border-primary-dark shadow-md relative">
			<span className="absolute -top-1 -right-1 flex size-3">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
				<span className="relative inline-flex size-3 rounded-full bg-primary"></span>
			</span>
			<label className=" w-full flex flex-col items-center gap-2">
				<span className="text-white text-lg">
					<strong>{position}. </strong>
					{children}
				</span>
				<Input
					type="text"
					name={'valtext_' + position}
					onChange={getData}
					className="w-ful"
					placeholder="Escriba el dato correspondiente..."
				/>
			</label>
		</Card>
	)
}

export default ValTextDesc

import { useContext, useState } from 'react'
import CheckListContext from '../../../../context/ChecklistContext'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'
import { Card } from '@/components/ui/card'

const ValDateDesc = ({ children, position, value = '', onChange }) => {
	const { updateActiveInside } = useContext(CheckListContext)
	const [date, setDate] = useState(new Date())

	const getData = selectedDate => {
		updateActiveInside(position, selectedDate, children)
		setDate(selectedDate)

		if (onChange) {
			onChange(selectedDate) // <-- NO uses selectedDate.target.value
		}
	}

	return (
		<Card className="flex w-full justify-between items-center bg-[hsl(var(--secondarywt))] p-2 rounded-xl text-center border border-primary-dark shadow-md relative">
			<span className="absolute -top-1 -right-1 flex size-3">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
				<span className="relative inline-flex size-3 rounded-full bg-primary"></span>
			</span>
			<span className="text-white text-lg">
				<strong>{position}. </strong>
				{children}
			</span>
			{/* <div className="description__valdate--date">
				<input type="date" onChange={getData} />
			</div> */}

			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
						<CalendarIcon />
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar mode="single" selected={date} onSelect={getData} initialFocus locale={es} />
				</PopoverContent>
			</Popover>
		</Card>
	)
}

export default ValDateDesc

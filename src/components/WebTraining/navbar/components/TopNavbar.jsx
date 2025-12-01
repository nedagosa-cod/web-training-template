import { Diamond, Home, Info, Menu, NotebookPen, SpellCheck, User2 } from 'lucide-react'
import ConfigMenu from './ConfigMenu'
import { Button } from '@/components/ui/button'
import AdminButton from './AdminButton'
import { NotesSheet } from '../../notas/MisNotas'
import { Link } from 'react-router-dom'
// import MultiTimer from '@/components/MultiTimer/MultiTimer'

const icons = {
	home: <Home className="w-4 h-4 text-secondary" />,
	checklist: <Menu className="w-4 h-4 text-secondary" />,
	note: <Info className="w-4 h-4 text-secondary" />,
	tipify: <Diamond className="w-4 h-4 text-secondary" />,
	admin: <User2 className="w-4 h-4 text-secondary" />,
}
export default function TopNavbar({ segmentos, activeSegment, setActiveSegment }) {
	function slugify(text) {
		return text
			.toString()
			.normalize('NFD') // Para eliminar acentos
			.replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (tildes)
			.toLowerCase()
			.replace(/\s+/g, '_') // Reemplaza espacios por guion bajo
			.replace(/[^\w\-]+/g, '') // Elimina caracteres especiales
			.replace(/\-\-+/g, '_') // Reemplaza múltiples guiones bajos por uno
			.replace(/^_+/, '') // Elimina guiones bajos al inicio
			.replace(/_+$/, '') // Elimina guiones bajos al final
	}

	return (
		<div className="bg-primary relative z-10 [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]">
			<div className="mx-auto">
				<div className="flex justify-between items-center">
					<div className="flex justify-around px-1 space-x-6 w-full">
						{segmentos.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								asChild
								className={
									activeSegment == item.segment
										? `cursor-pointer  bg-primaryDark text-white dark:text-dark h-8 px-2 w-full`
										: `cursor-pointer text-white hover:bg-secondary hover:text-foreground h-8 px-2 w-full`
								}>
								<a
									onClick={() => setActiveSegment(item.segment)}
									href={`#${slugify(item.segment)}`}
									className="flex items-center text-sm font-medium hover:bg-secondary hover:text-dark">
									<span className="mr-1">{icons[item.icon]}</span> {item.segment}
								</a>
							</Button>
						))}
					</div>
					<div className="flex items-center space-x-2 bg-[hsl(var(--primary-dark))] px-4">
						<NotesSheet />
						<Link
							to="/corrector"
							variant="ghost"
							className="flex justify-center items-center p-1 w-8 h-8 bg-white rounded cursor-pointer">
							<SpellCheck className="w-5 h-5 text-secondary" />
						</Link>
						{/* <MultiTimer /> */}
						<AdminButton />
						<ConfigMenu />
					</div>
				</div>
			</div>
		</div>
	)
}

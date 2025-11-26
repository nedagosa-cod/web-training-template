import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
	Menu,
	Calculator,
	Library,
	Diamond,
	TextCursorInput,
	MessageCircle,
	FileText,
	Clock,
	Download,
	MessageCircleQuestion,
	Globe,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
const icons = {
	segments: {
		checklist: <Menu className="w-6 h-6" />, // Lista/Menu
		calc: <Calculator className="w-6 h-6" />, // Calculadora
		library: <Library className="w-6 h-6" />, // Biblioteca
		tipify: <Diamond className="w-6 h-6" />, // Diamante
		textSlash: <MessageCircle className="w-6 h-6" />, // Burbuja de mensaje
		note: <FileText className="w-6 h-6" />, // Nota/Archivo
		timeLine: <Clock className="w-6 h-6" />, // Reloj/Línea de tiempo
		download: <Download className="w-6 h-6" />, // Descargar
		MessageCircleQuestion: <MessageCircleQuestion className="w-6 h-6" />,
		globe: <Globe className="w-6 h-6" />,
	},
	develops: {
		checklist: <Menu className="w-5 h-5" />, // Lista/Menu
		textSlash: <TextCursorInput className="w-5 h-5" />, // Input de texto
		note: <FileText className="w-5 h-5" />, // Nota/Archivo
		tipify: <Diamond className="w-5 h-5" />, // Diamante
		calc: <Calculator className="w-5 h-5" />, // Calculadora
		library: <Library className="w-5 h-5" />, // Biblioteca
		timeLine: <Clock className="w-5 h-5" />, // Reloj/Línea de tiempo
		download: <Download className="w-5 h-5" />, // Descargar
		MessageCircleQuestion: <MessageCircleQuestion className="w-5 h-5" />,
		globe: <Globe className="w-5 h-5" />,
	},
}

// Función para agrupar resultados por título+segmento
function groupResultsByTitleAndSegment(results) {
	return results.reduce((acc, item) => {
		const key = `${item.title}|||${item.segment}`
		if (!acc[key]) acc[key] = []
		acc[key].push(item)
		return acc
	}, {})
}

export const SearchResults = ({ results, handleSearch }) => {
	const groupedResults = useMemo(() => groupResultsByTitleAndSegment(results), [results])
	const [dialogItem, setDialogItem] = useState(null)

	if (results.length === 0) return null

	const handleItemClick = item => {
		if (item.action === 'download') {
			// Descargar archivo
			const link = document.createElement('a')
			link.href = item.path
			link.setAttribute('download', '')
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		} else if (item.action === 'redirect') {
			window.open(item.path, '_blank')
			window.close()
		} else if (item.action === 'dialog') {
			setDialogItem(item)
		} else {
			handleSearch(item.name)
		}
	}

	return (
		<>
			<div className="flex overflow-y-auto flex-col p-4 h-full text-black">
				{Object.entries(groupedResults).map(([key, items]) => {
					const [title, segment] = key.split('|||')
					return (
						<div key={key}>
							<Separator />
							<div className="flex gap-4 justify-between items-center">
								<div className="flex gap-4 items-center text-xl font-semibold">
									<span className="text-primary">{icons.segments[items[0].icon]}</span>
									<span className="text-[hsl(var(--primary-dark))]">{title}</span>
								</div>
								<span className="text-sm text-right text-gray-500">{segment}</span>
							</div>
							{items.map((item, idx) => {
								if (item.action === 'download') {
									return (
										<a
											href={item.path}
											download
											className="flex p-2 ml-8 rounded-lg cursor-pointer hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}
											onClick={e => e.stopPropagation()}>
											<div className="flex gap-4 justify-start items-center text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</a>
									)
								} else if (item.action === 'redirect') {
									return (
										<a
											href={item.path}
											target="_blank"
											className="flex p-2 ml-8 rounded-lg cursor-pointer hover:bg-gray-200"
											key={`${item.name}-${idx}`}>
											<div className="flex gap-4 justify-start items-center text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</a>
									)
								} else if (item.action === 'dialog') {
									return (
										<div
											className="flex p-2 ml-8 rounded-lg cursor-pointer hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}
											onClick={() => handleItemClick(item)}>
											<div className="flex gap-4 justify-start items-center text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</div>
									)
								} else {
									return (
										<Link
											to={item.path}
											className="flex p-2 ml-8 rounded-lg cursor-pointer hover:bg-gray-200"
											key={item.id || `${item.name}-${idx}`}>
											<div className="flex gap-4 justify-start items-center text-base">
												<span className="text-accent">{icons.develops[item.icon]}</span>
												<span className="w-11/12">{item.name}</span>
											</div>
										</Link>
									)
								}
							})}
						</div>
					)
				})}
			</div>
			{/* Dialog para mostrar contenido personalizado */}
			<Dialog open={!!dialogItem} onOpenChange={open => !open && setDialogItem(null)}>
				<DialogContent>
					{dialogItem && (
						<>
							<DialogHeader>
								<DialogTitle>{dialogItem.title}</DialogTitle>
								<DialogDescription>{dialogItem.content}</DialogDescription>
							</DialogHeader>
							<div className="mt-4">
								<p className="text-lg font-semibold">{dialogItem.name}</p>
								<p className="mt-2 text-base">{dialogItem.content}</p>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}

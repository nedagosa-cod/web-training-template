import { GlobeIcon, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useSearch } from '@/context/SearchProvider'
import { SearchResults } from './SearchResults'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export default function BuscadorWT({ open }) {
	const { handleSearchVista, handleSearchGlobal } = useSearch()
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('')

	const inputRef = useRef(null)

	const handleInputChange = e => {
		const value = e.target.value
		setQuery(value)
		handleSearchVista(value)
		if (open) {
			const searchResults = handleSearchGlobal(value)
			setResults(searchResults)
		}
	}

	const resetSearch = () => {
		setQuery('')
		setResults([])
		handleSearchVista('')
	}

	useEffect(() => {
		if (open && inputRef.current) {
			inputRef.current.focus()
		} else {
			resetSearch()
		}
		// eslint-disable-next-line
	}, [open])

	return (
		<div
			className={`absolute top-full mt-[22px] left-1/2 transform -translate-x-1/2 w-1/2 bg-white shadow-md rounded-b-3xl transition-all duration-300  border-b-2 border-primary  ${
				open ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0 ring-2 ring-primary z-1000'
			}`}>
			<div className={`relative flex items-center h-16 transition-all duration-300 `}>
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={handleInputChange}
					placeholder="¿Qué estás buscando?"
					className="w-full h-full pl-6 pr-12 text-xl bg-transparent outline-none text-primary placeholder-accent"
				/>

				<button onClick={resetSearch}>
					<X className="w-8 h-8 mr-4 cursor-pointer text-accent hover:text-primary" />
				</button>

				<Dialog>
					<DialogTrigger>
						<div className="cursor-pointer relative after:content-['Busqueda_global'] after:text-white after:absolute after:text-nowrap after:scale-0 hover:after:scale-100 after:duration-200 w-14 h-12 rounded-full  border-4 border-sky-200 bg-primary pointer flex items-center justify-center duration-300 hover:rounded-[50px] hover:w-48 group/button overflow-hidden active:scale-90 mx-2">
							<GlobeIcon className="w-4 h-4 text-white duration-200 delay-50 group-hover/button:-translate-y-12" />
						</div>
					</DialogTrigger>
					<DialogContent className="flex flex-col min-w-[700px] translate-y-0 top-[5%] min-h-52 max-h-[90%]">
						<DialogHeader className="flex flex-col text-black" side="left">
							<DialogTitle className="mb-4 text-2xl font-bold">Buscador Global</DialogTitle>
							<DialogDescription className="text-sm text-gray-500">
								Busca por palabra clave el contenido que deseas buscar en toda la web training.
							</DialogDescription>
							<div className="flex flex-col w-full gap-2">
								<label className="flex w-full gap-2" htmlFor="name">
									<input
										className="rounded-full bg-primary/10 text-xl border-2 border-primary p-4 placeholder-primary focus:text-[hsl(var(--primary-dark))] focus:border-[hsl(var(--primary-light))] focus:outline-none focus:ring-2 focus:ring-primary w-full"
										placeholder="Buscar..."
										value={query}
										onChange={handleInputChange}
									/>
								</label>
							</div>
						</DialogHeader>
						<SearchResults results={results} handleSearch={handleSearchVista} />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

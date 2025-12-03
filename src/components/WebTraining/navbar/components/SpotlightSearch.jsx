import { useEffect, useRef, useState } from 'react'
import { useSearch } from '@/context/SearchProvider'
import 'animate.css'
import IconChecklistC from '@/icons/Color/IconChecklistC'
import IconCalculator from '@/icons/IconCalculator'
import IconCheckList from '@/icons/IconCheckList'
import IconCalculatorC from '@/icons/Color/IconCalculatorC'
import IconLibraryC from '@/icons/Color/IconLibraryC'
import IconLibrary from '@/icons/IconLibrary'
import IconTypifierC from '@/icons/Color/IconTypifierC'
import IconTipify from '@/icons/IconTipify'
import IconTextSlash from '@/icons/IconTextSlash'
import IconTextBubleC from '@/icons/Color/IconTextBubleC'
import IconWeb from '@/icons/IconWeb'
import IconNote from '@/icons/IconNote'
import IconWindowFormC from '@/icons/Color/IconWindowFormC'
import IconTimeLine from '@/icons/IconTimeLine'
import IconUser from '@/icons/IconUser'
import IconPhone from '@/icons/IconPhone'
import IconTimeLineC from '@/icons/Color/IconTimeLineC'
import IconDeleteOt from '@/icons/IconDeleteOt'
import IconUserC from '@/icons/Color/IconUserC'
import IconPhoneC from '@/icons/Color/IconPhoneC'
import IconWebC from '@/icons/Color/IconWebC'
import IconComents from '@/icons/IconCommets'
import IconComentsC from '@/icons/Color/IconComentsC'
import IconGear from '@/icons/IconGear'
import { IconGearC } from '@/icons/Color/IconGearC'
import IconMatrizC from '@/icons/Color/IconMatrizC'
import IconMatriz from '@/icons/IconMatriz'
import IconCatalogue from '@/icons/IconCatalog'
import IconCatalogueC from '@/icons/Color/IconCatalogC'
import IconTable from '@/icons/IconTable'
import IconTableC from '@/icons/Color/IconTableC'
import IconFilesTree from '@/icons/IconFilesTree'
import IconFilesTreeC from '@/icons/Color/IconFilesTreeC'
import IconUserX from '@/icons/IconUserX'
import IconUserXC from '@/icons/Color/IconUserXC'
import IconX from '@/icons/IconX'
import IconXC from '@/icons/Color/iconXC'
import IconClockC from '@/icons/Color/IconClockC'
import IconClock from '@/icons/IconClock'
import IconVentas from '@/icons/IconVentas'
import IconVentasC from '@/icons/Color/IconVentasC'
import { Globe, GlobeIcon, Search } from 'lucide-react'
import BuscadorWT from './search/Buscador'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { SearchResults } from './search/SearchResults'

const SpotlightSearch = () => {
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

	// elimina el focus del buscador para que no se vea afectado control de accesos al show command
	useEffect(() => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}, [])

	return (
		<section className="relative">
			<div className="grid relative z-10 place-content-center p-2 bg-gradient-to-r rounded-full hornav__links--search from-primaryDark to-primaryDark">
				<div className="flex relative items-center p-1 h-10 bg-gradient-to-r rounded-full search__container from-primary to-primaryDark">
					<button className="search__container--delete" onClick={() => resetSearch()}>
						<IconDeleteOt />
					</button>
					<input
						ref={inputRef}
						name="search"
						className="pl-2 w-full text-white border-none outline-none"
						type="text"
						onChange={handleInputChange}
						value={query}
					/>
					<Search className="mx-2 w-8 h-8" />
					{/* Buscador Global */}
					<Dialog>
						<DialogTrigger>
							<div className="cursor-pointer relative after:content-['Busqueda_global'] after:text-white after:absolute after:text-nowrap after:scale-0 hover:after:scale-100 after:duration-200 w-14 h-9 rounded-full  border-2 border-white bg-primary pointer flex items-center justify-center duration-300 hover:rounded-[50px] hover:w-48 group/button overflow-hidden active:scale-90 ">
								<GlobeIcon className="w-4 h-4 text-white duration-200 delay-50 group-hover/button:-translate-y-12" />
							</div>
						</DialogTrigger>
						<DialogContent className="flex flex-col min-w-[700px] translate-y-0 top-[5%] min-h-52 max-h-[90%]">
							<DialogHeader className="flex flex-col text-black" side="left">
								<DialogTitle className="mb-4 text-2xl font-bold">Buscador Global</DialogTitle>
								<DialogDescription className="text-sm text-gray-500">
									Busca por palabra clave el contenido que deseas buscar en toda la web training.
								</DialogDescription>
								<div className="flex flex-col gap-2 w-full">
									<label className="flex gap-2 w-full" htmlFor="name">
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
		</section>
	)
}

export default SpotlightSearch

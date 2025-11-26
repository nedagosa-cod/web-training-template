import { useEffect, useRef, useState } from 'react'
import 'animate.css'
import '../../../../styles/search.scss'
import {
	Menu,
	Calculator,
	Library,
	Diamond,
	TextCursorInput,
	MessageCircle,
	FileText,
	Clock,
	Globe,
	LayoutPanelTop,
	X,
	MessageCircleQuestionMark,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSearch } from '@/context/SearchProvider'

const SpotlightSearch = () => {
	const icons = {
		segments: {
			checklist: <Menu className="w-6 h-6" />, // Lista/Menu
			calc: <Calculator className="w-6 h-6" />, // Calculadora
			library: <Library className="w-6 h-6" />, // Biblioteca
			tipify: <Diamond className="w-6 h-6" />, // Diamante
			textSlash: <MessageCircle className="w-6 h-6" />, // Burbuja de mensaje
			note: <FileText className="w-6 h-6" />, // Nota/Archivo
			timeLine: <Clock className="w-6 h-6" />, // Reloj/Línea de tiempo
			messageCircleQuestionMark: <MessageCircleQuestionMark className="w-6 h-6" />,
		},
		develops: {
			checklist: <Menu className="w-5 h-5" />, // Lista/Menu
			textSlash: <TextCursorInput className="w-5 h-5" />, // Input de texto
			note: <FileText className="w-5 h-5" />, // Nota/Archivo
			tipify: <Diamond className="w-5 h-5" />, // Diamante
			calc: <Calculator className="w-5 h-5" />, // Calculadora
			library: <Library className="w-5 h-5" />, // Biblioteca
			timeLine: <Clock className="w-5 h-5" />, // Reloj/Línea de tiempo
			messageCircleQuestionMark: <MessageCircleQuestionMark className="w-5 h-5" />,
		},
	}
	const { searchGlobal } = useSearch()
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [typeSearch, setTypeSearch] = useState(() => {
		const activeSearch = localStorage.getItem('activeSearch')
		return activeSearch || 'vista'
	})

	const [searchFocus, setSearchFocus] = useState(false)

	const handleSearch = value => {
		setQuery(value)
		if (typeSearch == 'global') {
			const searchResults = searchGlobal(value)
			setResults(searchResults)
		} else {
			const lowerCase = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			const allCards = document.querySelectorAll('.dato-buscado')
			const mobileCards = Array.from(allCards).filter(card =>
				card.textContent
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.includes(lowerCase.toLowerCase())
			)
			Array.from(allCards).forEach(card => {
				card.classList.add('hide')
			})
			mobileCards.forEach(card => {
				card.classList.remove('hide')
			})
		}
	}

	useEffect(() => {
		document.addEventListener('click', e => {
			if (
				e.target.classList.contains('spotlight-radio-inputs') ||
				e.target.classList.contains('spotlight-hornav') ||
				e.target.classList.contains('spotlight-radio-input') ||
				e.target.classList.contains('spotlight-search-input')
			) {
				setSearchFocus(true)
			} else {
				setSearchFocus(false)
			}
		})
		document.querySelector('.radioInput--check').checked = true
	}, [])
	return (
		<section className="absolute top-full left-1/2 z-10 w-96 h-16 bg-blue-500 transform -translate-x-1/2 spotlight-hornav">
			<div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-2 grid place-content-center z-10 min-w-[200px]">
				<div className="relative w-full rounded-full bg-gradient-to-br from-primary-300 to-primary-500 p-1.5 h-14 flex items-center">
					<button className="mr-2 cursor-pointer" onClick={() => handleSearch('')}>
						<X className="w-6 h-6" />
					</button>
					<input
						className="pl-4 w-full text-lg text-white bg-gradient-to-br rounded-full border-none from-primary-300 to-primary-500 focus:outline-none spotlight-search-input"
						type="text"
						onChange={e => handleSearch(e.target.value)}
						value={query}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
					/>
					<svg
						viewBox="0 0 24 24"
						className="pl-3 ml-2 w-12 rounded-full border-l-2 border-white transition-all aspect-square hover:border-l-4"
						onClick={handleSearch}>
						<g>
							<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
						</g>
					</svg>
				</div>
			</div>
			{/* selectores de busqueda */}
			<div
				className={`spotlight-radio-inputs absolute z-50 left-1/2 w-4/5 flex gap-8 justify-center bg-primary-300 text-base py-2 px-4 rounded-tl-lg rounded-tr-lg animate__animated ${
					searchFocus ? 'animate__fadeInUp bottom-full' : 'bottom-[10%]'
				} ${searchFocus ? 'block' : 'hidden'}`}
				style={{ transform: 'translateX(-50%)' }}>
				<label
					className="flex gap-4 items-center cursor-pointer"
					onClick={() => {
						setQuery('')
						setTypeSearch('vista')
					}}>
					<input type="radio" name="radio" className="hidden spotlight-radio-input radioInput--check" />
					<span className="flex relative gap-4 items-center px-3 py-2 text-white rounded-tl-lg rounded-tr-lg border-none transition-all">
						<LayoutPanelTop className="w-5 h-5" />
						Vista
					</span>
				</label>
				<label
					className="flex gap-4 items-center cursor-pointer"
					onClick={() => {
						setQuery('')
						setTypeSearch('global')
					}}>
					<input type="radio" name="radio" className="hidden spotlight-radio-input" />
					<span className="flex relative gap-4 items-center px-3 py-2 text-white rounded-tl-lg rounded-tr-lg border-none transition-all">
						<Globe className="w-5 h-5" />
						Global
					</span>
				</label>
			</div>
			{/* elementos buscados globalmente */}
			{results.length > 0 && (
				<div
					className="opacity-100 w-full min-h-[40px] absolute left-1/2 top-0 z-50 bg-primary-500 text-white rounded-[4rem] shadow-lg text-base p-7 pt-8 animate__fadeInDown"
					style={{ transform: 'translateX(-50%)' }}>
					<div className="flex flex-col text-lg">
						{results.reduce((acc, curr, i) => {
							if (i > 0 && results[i - 1].type === curr.type && results[i - 1].title === curr.title) {
								return [
									...acc,
									<div
										className="flex flex-col p-2 ml-16 text-white rounded-lg cursor-pointer hover:bg-gray-200"
										key={i}
										onClick={() => {
											handleSearch(curr.name)
										}}>
										<Link to={curr.path}>
											<div className="flex gap-4 items-center text-base">
												{icons.develops[curr.icon]}
												<p className="w-11/12">{curr.name}</p>
											</div>
										</Link>
									</div>,
								]
							}

							return [
								...acc,
								<div className="flex gap-4 justify-between items-center text-white" key={i}>
									<div className="flex gap-4 items-center text-xl font-semibold">
										{icons.segments[curr.icon]}
										<span>{curr.title}</span>
									</div>
									<span className="text-sm text-right text-gray-300">{curr.segment}</span>
								</div>,
								<div
									className="flex flex-col p-2 ml-16 text-white rounded-lg cursor-pointer hover:bg-gray-200"
									key={i + 'dev'}
									onClick={() => {
										handleSearch(curr.name)
									}}>
									<Link to={curr.path}>
										<div className="flex gap-4 items-center text-base">
											{icons.develops[curr.icon]}
											<p className="w-11/12">{curr.name}</p>
										</div>
									</Link>
								</div>,
							]
						}, [])}
					</div>
				</div>
			)}
		</section>
	)
}

export default SpotlightSearch

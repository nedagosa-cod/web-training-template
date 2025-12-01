import './hornav.scss'
import './navigation-menu-custom.css'
import 'animate.css'
import DATANAV from '@/data/dataNavbar.json'
import React, { useEffect, useRef, useState } from 'react'

import 'driver.js/dist/driver.css'

import imgLogo from '@images/index/logoSIn.png'

import SpotlightSearch from './SpotlightSearch'
import { SkipBack, SkipForward, SquareMenu } from 'lucide-react'
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import NavItemAppsWeb from './NavItemAppsWeb'
import NavItemPortada from './search/NavItemPortada'
import NavItemLista from './search/NavItemLista'
import NavItemRegular from './search/NavItemRegular'
import { icons } from '../../../../icons/icons-list'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const HorNav = ({ activeSegment }) => {
	const scrollContainerRef = useRef(null)
	const [windowDB, setWindowDB] = useState(false)
	const [activeLink, setActiveLink] = useState('Inicio')
	const [expandedMenus, setExpandedMenus] = useState(new Set())
	const navigate = useNavigate()

	const handleScroll = event => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += event.deltaY
		}
	}
	const handleLinkClick = linkTitle => {
		setActiveLink(linkTitle)
	}

	// Función para manejar la navegación
	const handleNavigation = route => {
		if (route.startsWith('http')) {
			// Enlaces externos se abren en nueva pestaña
			window.open(route, '_blank')
		} else {
			// Enlaces internos usan React Router
			navigate(route)
		}
	}

	// Función para toggle de menús expandibles
	const toggleMenu = menuKey => {
		setExpandedMenus(prev => {
			const newSet = new Set(prev)
			if (newSet.has(menuKey)) {
				newSet.delete(menuKey)
			} else {
				newSet.add(menuKey)
			}
			return newSet
		})
	}

	// Función para obtener los elementos del navbar organizados por segmento y tipo
	const getNavbarBySegments = () => {
		const segments = DATANAV.SEGMENTS.map(seg => seg.segment)
		const result = {}

		// Inicializar segmentos con subdivisiones
		segments.forEach(segment => {
			result[segment] = {
				simple: [], // Elementos sin dropdown
				dropdown: [], // Elementos con dropdown
			}
		})
		result['GLOBAL'] = {
			simple: [],
			dropdown: [],
		}

		// Clasificar elementos del navbar
		DATANAV.NAVBAR.forEach(item => {
			const category = item.dropDown ? 'dropdown' : 'simple'

			if (item.segments) {
				item.segments.forEach(segment => {
					if (result[segment]) {
						result[segment][category].push(item)
					}
				})
			} else {
				result['GLOBAL'][category].push(item)
			}
		})

		return result
	}

	// Función para renderizar un elemento del navbar
	const renderNavItem = (item, index) => {
		const iconElement = icons[item.icon]

		// Si no tiene dropdown, renderizar elemento simple
		if (!item.dropDown) {
			return (
				<div
					key={index}
					className="flex justify-between items-center p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm hover:border-primary/20 bg-card"
					onClick={() => item.route && handleNavigation(item.route)}>
					<div className="flex items-center space-x-3">
						{iconElement && React.cloneElement(iconElement, { className: 'w-4 h-4 text-primary' })}
						<span className="text-sm font-medium">{item.title}</span>
					</div>
					{item.route && (
						<div className="transition-colors text-muted-foreground hover:text-primary" title="Ir a esta sección">
							{item.route.startsWith('http') ? (
								<ExternalLink className="w-4 h-4" />
							) : (
								<ChevronRight className="w-4 h-4" />
							)}
						</div>
					)}
				</div>
			)
		}

		// Si tiene dropdown, renderizar como lista compacta colapsable
		const menuKey = `${item.title}-${index}`
		const isExpanded = expandedMenus.has(menuKey)

		return (
			<div key={index} className="space-y-1">
				{/* Elemento principal */}
				<div className="flex justify-between items-center p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm hover:border-primary/20 bg-card">
					<div
						className="flex flex-1 items-center space-x-3"
						onClick={() => item.route && handleNavigation(item.route)}>
						{iconElement && React.cloneElement(iconElement, { className: 'w-4 h-4 text-primary' })}
						<span className="text-sm font-medium">{item.title}</span>
					</div>

					<div className="flex items-center space-x-2">
						{/* Botón de navegación principal (si tiene ruta) */}
						{item.route && (
							<div
								className="p-1 transition-colors text-muted-foreground hover:text-primary"
								title="Ir a esta sección"
								onClick={() => handleNavigation(item.route)}>
								{item.route.startsWith('http') ? (
									<ExternalLink className="w-4 h-4" />
								) : (
									<ChevronRight className="w-4 h-4" />
								)}
							</div>
						)}

						{/* Botón de colapso/expansión */}
						<div
							className="p-1 transition-colors text-muted-foreground hover:text-primary"
							title={isExpanded ? 'Colapsar menú' : 'Expandir menú'}
							onClick={() => toggleMenu(menuKey)}>
							{isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
						</div>
					</div>
				</div>

				{/* Lista de subelementos (colapsable) */}
				{isExpanded && (
					<div className="ml-4 space-y-1 duration-200 animate-in slide-in-from-top-2">
						{item.dropDown.map((subItem, subIndex) => {
							const subIconElement = icons[subItem.icon]
							return (
								<div
									key={subIndex}
									className="flex justify-between items-center p-2 rounded-md transition-colors cursor-pointer hover:bg-muted/50"
									onClick={() => handleNavigation(subItem.route)}>
									<div className="flex items-center space-x-2">
										{subIconElement &&
											React.cloneElement(subIconElement, { className: 'w-3 h-3 text-muted-foreground' })}
										<span className="text-xs text-muted-foreground">{subItem.title}</span>
									</div>
									<div className="transition-colors text-muted-foreground hover:text-primary" title="Ir a esta opción">
										{subItem.route.startsWith('http') ? (
											<ExternalLink className="w-3 h-3" />
										) : (
											<ChevronRight className="w-3 h-3" />
										)}
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		)
	}

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft -= 790 // Ajusta el valor según la cantidad que desees desplazar
		}
	}

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += 790 // Ajusta el valor según la cantidad que desees desplazar
		}
	}

	useEffect(() => {
		document.body.addEventListener('keydown', e => {
			if (e.key == 'Escape') {
				setWindowDB(false)
			}
		})
	})
	return (
		<div className="w-full hornav">
			<nav className="flex relative justify-between items-center px-2 w-full h-20 bg-background hornav__links">
				{/* botones de navegación */}
				<div className="flex items-center px-2 space-x-2 w-full">
					{/* Dialog de navegación completa */}
					<Dialog>
						<DialogTrigger className="flex justify-center items-center w-8 h-8 rounded-full ring-2 cursor-pointer bg-primary ring-secondary">
							<SquareMenu className="w-3 h-3 font-bold text-white" />
						</DialogTrigger>
						<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle className="flex items-center space-x-2">
									<SquareMenu className="w-5 h-5" />
									<span>Navegación Completa</span>
								</DialogTitle>
								<p className="text-sm text-muted-foreground">
									Accede a todas las secciones y herramientas organizadas por segmento
								</p>
							</DialogHeader>

							<div className="mt-4 space-y-6">
								{Object.entries(getNavbarBySegments()).map(([segment, categories]) => {
									const hasItems = categories.simple.length > 0 || categories.dropdown.length > 0
									if (!hasItems) return null

									return (
										<div key={segment}>
											<div className="flex items-center mb-4 space-x-2">
												<Badge variant={segment === activeSegment ? 'default' : 'secondary'} className="text-sm">
													{segment}
												</Badge>
												{segment === activeSegment && (
													<span className="text-xs text-muted-foreground">(Segmento activo)</span>
												)}
											</div>

											<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
												{/* Columna de elementos simples */}
												{categories.simple.length > 0 && (
													<div>
														<h4 className="flex items-center mb-3 text-sm font-medium text-muted-foreground">
															<span className="mr-2 w-2 h-2 rounded-full bg-primary"></span>
															Navegación Directa
														</h4>
														<div className="space-y-2">
															{categories.simple.map((item, index) => renderNavItem(item, `simple-${index}`))}
														</div>
													</div>
												)}

												{/* Columna de elementos con dropdown */}
												{categories.dropdown.length > 0 && (
													<div>
														<h4 className="flex items-center mb-3 text-sm font-medium text-muted-foreground">
															<span className="mr-2 w-2 h-2 rounded-full bg-secondary"></span>
															Menús Expandibles
														</h4>
														<div className="space-y-3">
															{categories.dropdown.map((item, index) => renderNavItem(item, `dropdown-${index}`))}
														</div>
													</div>
												)}
											</div>

											{segment !== 'GLOBAL' && <Separator className="mt-6" />}
										</div>
									)
								})}
							</div>

							<div className="p-4 mt-6 rounded-lg bg-muted/50">
								<p className="text-xs text-center text-muted-foreground">
									💡 Tip: Haz clic en los íconos de flecha para navegar directamente a cada sección
								</p>
							</div>
						</DialogContent>
					</Dialog>
					<div className="flex relative justify-between items-center w-full text-white bg-gradient-to-r rounded-full from-primary/70 to-primary/70 hornav__links--container dark:bg-primary">
						<div className="flex overflow-hidden justify-between items-center mr-2 h-[56px] md:w-4/5  w-full rounded-full bg-gradient-to-r from-primaryDark to-primary">
							<div
								onClick={scrollLeft}
								className="flex justify-center items-center w-14 h-full ring-1 cursor-pointer bg-primary ring-accent">
								<SkipBack />
							</div>
							<NavigationMenu
								ref={scrollContainerRef}
								onWheel={handleScroll}
								className="flex overflow-y-hidden gap-5 justify-around items-center w-full h-14 text-sm list-none whitespace-nowrap scroll-smooth overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-primaryLight [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 static">
								<NavigationMenuList className="gap-2 px-2">
									{DATANAV.NAVBAR.map((item, i) => {
										if (item.segments) {
											return item.segments.map((segment, index) => {
												if (!segment.includes(activeSegment)) return null

												// Caso especial: Aplicativos web
												if (item.title === 'Aplicativos web' && item.dropDown) {
													return (
														<NavItemAppsWeb
															key={`${i}-${index}`}
															label={item.title}
															icon={icons[item.icon]}
															submenu={item.dropDown}
														/>
													)
												}

												// Menú desplegable con portada
												if (item.dropDown && item.portada) {
													return (
														<NavItemPortada
															key={`${i}-${index}`}
															label={item.title}
															icon={icons[item.icon]}
															submenu={item.dropDown}
														/>
													)
												}

												// Menú desplegable sin portada
												if (item.dropDown) {
													return (
														<NavItemLista
															key={`${i}-${index}`}
															components={item.dropDown}
															label={item.title}
															icon={icons[item.icon]}
														/>
													)
												}

												// Menú regular
												return (
													<NavItemRegular
														key={`${i}-${index}`}
														label={item.title}
														href={`#${item.route}`}
														icon={icons[item.icon]}
													/>
												)
											})
										}

										// Si no hay segments
										if (item.dropDown) {
											if (item.title === 'Aplicativos web') {
												return (
													<NavItemAppsWeb
														key={`${i}-${item.title}`}
														label={item.title}
														icon={icons[item.icon]}
														submenu={item.dropDown}
													/>
												)
											}
											return (
												<NavItemLista
													key={`${i}-${item.title}`}
													components={item.dropDown}
													label={item.title}
													icon={icons[item.icon]}
												/>
											)
										}

										return (
											<NavItemRegular
												key={`${i}-${item.title}`}
												label={item.title}
												href={`#${item.route}`}
												icon={icons[item.icon]}
											/>
										)
									})}
								</NavigationMenuList>
							</NavigationMenu>
							<div
								onClick={scrollRight}
								className="flex justify-center items-center w-14 h-full ring-1 cursor-pointer bg-primaryDark ring-accent">
								<SkipForward />
							</div>
						</div>
						<SpotlightSearch />
					</div>
				</div>

				{/* parte derecha del navbar */}
				<div className="flex justify-end items-center space-x-4 h-full">
					<div className="w-1 h-12 rounded bg-gradient-to-b from-primary to-[hsl(var(--primary-dark))] mx-1"></div>
					<div className="flex items-center h-full">
						<div className="flex items-center">
							<figure className="w-20">
								<img src={imgLogo} alt="logo" />
							</figure>

							<div className="hidden relative flex-col justify-center items-center mx-4 lg:flex">
								<h2 className="text-3xl text-center text-primary dark:text-white text-nowrap">Web Training</h2>
								<span className="text-sm text-center text-primary dark:text-white text-nowrap">NOMBRE CAMPAÑA</span>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default HorNav

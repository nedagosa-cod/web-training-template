;<div className="flex relative justify-between items-center w-full h-full rounded-l-full bg-background">
	{/* Círculos animados */}
	<ul className="overflow-hidden absolute top-0 left-0 z-0 w-full h-full circles">
		{[...Array(10)].map((_, i) => (
			<li
				key={i}
				className={`
											absolute block  rounded-none animate-floating
											${i === 0 ? 'left-1/4 w-20 h-20 animate-delay-0' : ''}
											${i === 1 ? 'left-[10%] w-5 h-5 animate-delay-2s animate-duration-12s' : ''}
											${i === 2 ? 'left-[70%] w-5 h-5 animate-delay-4s' : ''}
											${i === 3 ? 'left-[40%] w-[60px] h-[60px] animate-delay-0 animate-duration-18s' : ''}
											${i === 4 ? 'left-[65%] w-5 h-5 animate-delay-0' : ''}
											${i === 5 ? 'left-[75%] w-[110px] h-[110px] animate-delay-3s' : ''}
											${i === 6 ? 'left-[35%] w-[150px] h-[150px] animate-delay-7s' : ''}
											${i === 7 ? 'left-1/2 w-[25px] h-[25px] animate-delay-15s animate-duration-45s' : ''}
											${i === 8 ? 'left-[20%] w-[15px] h-[15px] animate-delay-2s animate-duration-35s' : ''}
											${i === 9 ? 'left-[85%] w-[150px] h-[150px] animate-delay-0 animate-duration-11s' : ''}
										`}>
				{/* Logo */}

				<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 189.21">
					<path
						className="cls-2"
						fill="#ff7a02"
						d="M187.58,153.79c-11.25,2.71-12.67,7.55-10.21,15.51,1.32,4.25,1.12,12.93-.46,13.46-7.84,2.62-7.1-6.02-10.17-9.88-2.54-3.19-1.88-9.41-9.01-8.1-4.55.83-7.34,2.02-7.31,7.21.02,3.64-.17,7.46-1.27,10.87-.78,2.4-3.25,4.25-4.97,6.35-1.65-2.2-3.97-4.18-4.77-6.65-1.01-3.12-.11-6.89-1.26-9.91-1.07-2.81-3.26-5.87-5.81-7.3-4.29-2.4-7.31-.04-9.01,4.42-1.3,3.41-2.68,6.93-4.8,9.84-1.35,1.87-4.1,2.72-6.23,4.02-1-2.53-2.86-5.08-2.78-7.57.12-3.57,2.41-7.1,2.36-10.62-.04-2.98-1.3-7.18-3.46-8.53-2.04-1.27-6.48-.38-8.92,1.1-3.56,2.17-6.05,6.05-9.48,8.52-1.51,1.08-5.02,1.41-6.17.41-1.27-1.1-1.65-4.4-1-6.24.98-2.79,2.87-5.47,4.94-7.63,6.16-6.43,5.02-11.61-2.76-16.48-4.02,1.78-8.3,4.22-12.91,5.54-3,.86-6.46.07-9.72.02,1.62-3.09,2.86-6.48,4.98-9.17,1.63-2.07,4.99-2.84,6.45-4.96,1.75-2.53,3.75-6.38,2.96-8.75-.78-2.35-4.75-4.57-7.62-5.07-3.78-.66-7.91.93-11.8.57-2.25-.21-4.32-2.37-6.47-3.65,1.51-1.98,2.61-4.78,4.61-5.75,3.5-1.72,7.91-1.69,11.26-3.59,2.51-1.43,5.45-4.74,5.45-7.21,0-2.49-2.89-5.89-5.41-7.27-3.65-2-8.29-2.14-12.12-3.89-1.71-.78-3.68-3.79-3.38-5.38.3-1.58,3.2-3.51,5.15-3.74,3.58-.42,7.33.02,10.93.6,4.58.74,7.88.89,9.91-4.81,2.06-5.77-1.03-7.73-4.73-10.14-2.3-1.5-4.97-2.81-6.57-4.9-1.73-2.28-2.41-5.36-3.55-8.09,2.72-.28,5.49-1.02,8.13-.68,2.32.3,4.49,1.8,6.72,2.8q8.79,3.97,15.53-5.21c-2.98-4.5-6.53-9.06-9.09-14.13-1.06-2.09.01-5.26.11-7.94,2.42.49,5.31.32,7.16,1.63,3.2,2.25,5.43,5.96,8.72,8.01,2.23,1.39,6.46,2.24,8.21,1.04,2.26-1.55,4.04-5.41,4.03-8.26-.02-4.14-2.25-8.23-2.69-12.44-.2-1.94,1.59-4.09,2.49-6.15,2.2,1.04,5.08,1.54,6.45,3.24,2.05,2.54,3.03,5.94,4.47,8.98,1.83,3.87,3.17,7.58,9.2,6.48,5.8-1.06,6.42-4.46,6.62-9.03.16-3.65.19-7.43,1.21-10.88C140.25,2.51,142.75,0,144.38,0c1.57,0,4.01,2.61,4.54,4.5,1.06,3.77,1.35,7.83,1.43,11.79.09,4.7,1.9,6.94,6.73,7.99,5.52,1.2,6.94-2.08,8.6-5.81,1.37-3.07,2.35-6.49,4.42-9,1.58-1.91,4.6-2.63,6.98-3.88.83,2.34,2.24,4.66,2.34,7.04.1,2.32-.93,4.78-1.82,7.04-2.99,7.57-1.72,13,11.05,15.7,2.07-2.81,5.13-7.84,9.13-11.96,1.44-1.49,5.1-.81,7.75-1.12-.09,2.45.54,5.24-.42,7.28-1.67,3.55-5.06,6.37-6.31,9.99-.94,2.71-.64,6.91.95,9.09,1.26,1.73,5.53,2.33,8.11,1.78,3.79-.8,7.15-3.53,10.93-4.53,2.18-.58,4.84.62,7.28,1.02-.82,2.55-.99,5.69-2.62,7.52-2.37,2.67-6.35,3.95-8.6,6.68-1.88,2.27-3.27,5.83-3.11,8.72.26,4.95,3.82,6.17,8.58,5.25,3.87-.74,7.94-1.17,11.83-.81,1.87.17,4.72,2.25,5,3.84.28,1.6-1.65,4.59-3.34,5.35-3.85,1.74-8.49,1.85-12.13,3.86-2.54,1.41-5.46,4.9-5.41,7.4.05,2.46,3.2,5.63,5.78,7.07,3.37,1.88,7.77,1.89,11.23,3.66,1.87.96,2.72,3.93,4.03,5.99-1.88,1.18-3.69,3.22-5.64,3.35-3.91.27-8.01-1.24-11.81-.62-2.92.48-6.86,2.53-7.83,4.91-.9,2.22.86,6.29,2.65,8.63,1.95,2.55,5.72,3.65,7.89,6.1,1.9,2.15,2.68,5.28,3.95,7.98-2.92.36-5.83.89-8.75.99-1.09.04-2.17-1.2-3.33-1.41-4.96-.89-8.93-8.25-15.19-1.16-6.29,7.12,1.1,10.13,3.14,14.75.85,1.93,2.82,3.45,3.34,5.41.54,2.03-.07,4.36-.18,6.56-2.42-.14-5.75.67-7.1-.61-4.19-3.96-7.63-8.71-10.86-12.55ZM143.93,151.29c31.64.16,57.21-25.22,57.21-56.79,0-31.42-25.86-57.13-57.28-56.94-30.84.18-55.95,25.55-56.39,56.99-.43,30.62,25.4,56.58,56.45,56.74Z"
					/>
					<path
						className="cls-1"
						fill="#003d61"
						d="M0,96.63v-3.29c0-1.69.86-3.04,2.59-4.05l33.51-19.83c.91-.61,1.82-.91,2.73-.91,1.08,0,2.05.42,2.91,1.27.86.85,1.29,1.88,1.29,3.09,0,1.59-.62,2.75-1.87,3.5l-31.34,18.55,31.35,18.43c1.24.81,1.86,2.01,1.86,3.6,0,1.22-.43,2.25-1.29,3.1s-1.83,1.27-2.91,1.27c-.84,0-1.76-.3-2.73-.91L2.58,100.68c-1.72-.94-2.58-2.29-2.58-4.05Z"
					/>
					<path
						className="cls-1"
						fill="#003d61"
						d="M288,93.66v3.32c0,1.7-.87,3.07-2.62,4.09l-33.86,20.04c-.92.61-1.84.92-2.76.92-1.09,0-2.07-.43-2.94-1.28-.87-.85-1.3-1.9-1.3-3.12,0-1.6.63-2.78,1.89-3.53l31.67-18.74-31.68-18.63c-1.25-.82-1.88-2.03-1.88-3.64,0-1.23.43-2.27,1.3-3.13s1.85-1.28,2.94-1.28c.85,0,1.77.31,2.76.92l33.87,19.98c1.74.95,2.6,2.32,2.6,4.09Z"
					/>
				</svg>
			</li>
		))}
	</ul>

	{/* Contenido del navbar (con z-index para estar por encima de los círculos) */}
	<div className="flex relative z-10 items-center mr-6 w-full">
		<div className="hidden justify-end items-center px-6 space-x-1 w-full md:flex">
			{leftItems.length > 0 && (
				<SecondaryNavbar data={leftItems} activeSegment={activeSegment} className="justify-end" />
			)}
		</div>
	</div>

	{/* Botón de búsqueda central */}
	<button
		onClick={() => {
			if (!searchOpen) {
				// ABRIR
				setSearchOpen(true)
				setTimeout(() => setShowBuscador(true), 50) // le damos un pequeño delay
			} else {
				// CERRAR
				setShowBuscador(false)
				setTimeout(() => setSearchOpen(false), 300) // esperamos la animación para desmontar
			}
		}}
		className="group bg-secondary rounded absolute left-1/2 transform -translate-x-1/2 hover:bg-primary py-1 px-3 shadow-xl shadow-primary transition-all z-20 aspect-square cursor-pointer [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset] flex items-center justify-center flex-col"
		aria-label="Buscar">
		<div className="flex flex-col items-center p-1 transition-all duration-300 group-hover:scale-110">
			<TextSearch className="w-14 h-14 text-white" />
			<span className="text-sm text-white">Buscar</span>
		</div>
	</button>

	{/* Navbar derecho */}
	<div className="flex relative z-10 items-center ml-6 w-full">
		<div className="hidden items-center px-6 space-x-1 w-full md:flex">
			{rightItems.length > 0 && (
				<SecondaryNavbar data={rightItems} activeSegment={activeSegment} className="justify-start" />
			)}
		</div>
	</div>
</div>

const isAdmin = navSegment === 'ADMIN'
const hasSegment = link.segments && link.segments.includes(navSegment)
const shouldRenderLink = isAdmin ? hasSegment : !link.segments || hasSegment

if (!shouldRenderLink) return null

const renderDropDown = () => (
	<ul
		ref={dropDownRef}
		className="hornav-dropdown animate__animated"
		name={link.title}
		style={{ backgroundImage: `url(${dropImg})` }}>
		<li className="hornav-dropdown__li li-menu">
			<div className="title-container">
				<a href="#" className="buttonul type--C">
					<span className="buttonul__text">{link.title}</span>
					<div className="buttonul__drow1"></div>
					<div className="buttonul__drow2"></div>
				</a>
			</div>
		</li>
		<li className="hornav-dropdown__li li-submenu">
			{link.dropDown.map((linkk, l) => (
				<Link
					to={linkk.route}
					key={l}
					onClick={e => {
						activeDropDown(e.target)
					}}>
					{selectIcon[linkk.icon]} {linkk.title}
				</Link>
			))}
		</li>
	</ul>
)

const renderLink = () => (
	<li
		key={i}
		className={
			'hornav__links--li flex items-center justify-center cursor-pointer h-full px-4 hover:text-primary hover:bg-white' +
			(activeLink === link.title ? ' active' : '')
		}>
		{link.dropDown ? (
			<>
				<button
					className="flex gap-2 justify-center items-center space-x-2"
					type="button"
					onClick={e => {
						activeDropDown(e.target)
						handleLinkClick(link.title)
					}}>
					{selectIcon[link.icon]} {link.title} <ChevronDown />
				</button>
				{renderDropDown()}
			</>
		) : (
			<Link
				to={link.route}
				className="flex gap-2 justify-center items-center space-x-2"
				onClick={() => handleLinkClick(link.title)}>
				{selectIcon[link.icon]} {link.title}
			</Link>
		)}
	</li>
)

return renderLink()

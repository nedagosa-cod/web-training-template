import '@styles/app.scss'
import { Routes, Route } from 'react-router-dom'
import imgCtrlAccesss from './assets/images/index/sessionBackground.jpg'
import dataNavbar from '@/data/dataNavbar.json'
import Bienvenida from './components/Bienvenida/Bienvenida'
import Corrector from './components/Corrector/Corrector'
import Navbar from './components/WebTraining/navbar/Navbar.jsx'
import { useEffect } from 'react'
import { slugify } from './lib/utils'

const App = () => {
	useEffect(() => {
		const sessionRec = document.querySelector('.sessionRec')

		if (sessionRec) {
			if (sessionStorage.getItem('session') != 'true') {
				const sessionRec = document.querySelector('.sessionRec')
				sessionRec.style.backgroundImage = `url(${imgCtrlAccesss})`
				sessionRec.style.backgroundSize = 'cover'
				sessionRec.style.backgroundRepeat = 'no-repeat'
				sessionRec.style.backgroundPosition = 'center'
			}
		}
	})

	return (
		<div className="flex relative flex-col-reverse bg-center bg-cover h-dvh">
			<section className="w-[calc(100%-32px)] h-full rounded-xl border-2 border-red-500 shadow-xl shadow-foreground/50 mx-auto my-4 overflow-x-hidden overflow-y-auto  bg-center  relative bg-background bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:6rem_4rem]">
				<Routes>
					{dataNavbar.SEGMENTS.map((segment, i) => {
						return <Route key={i} path={'/' + slugify(segment.segment)} element={<Bienvenida />} />
					})}
					<Route path="/" element={<Bienvenida />} />
					<Route path="/corrector" element={<Corrector />} />
				</Routes>
			</section>
			<Navbar />
		</div>
	)
}

export default App

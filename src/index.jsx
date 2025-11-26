import { StrictMode } from 'react'
import './styles/index.scss'
import './styles/session.scss'
import './js/session.js'
import './styles/globals.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.jsx'
import { SearchProvider } from './context/SearchProvider.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from '@/components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<GlobalProvider>
				<SearchProvider>
					<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
						<App />
						<Toaster richColors />
					</ThemeProvider>
				</SearchProvider>
			</GlobalProvider>
		</HashRouter>
	</StrictMode>
)

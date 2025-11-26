import { Button } from '@/components/ui/button'

import { BookOpenCheck, LogOut, Palette, Settings, SpellCheck, UserCog } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import GlobalContext from '@/context/GlobalContext'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import ExcelDrawer from './DDBBDrawer'
import { NotesSheet } from '../../notas/MisNotas'
import readXlsxFile from 'read-excel-file'

export default function ConfigMenu() {
	const [version, setVersion] = useState(null)
	const { setTheme, theme } = useTheme()
	const setVersionState = async () => {
		const ruta = `./BASES_XxxXxx/NO_TOCAR.xlsx`
		const rutaCompleta = new URL(ruta, window.location.href).href
		const response = await fetch(rutaCompleta)
		const data = await response.blob()
		const dataExcel = await readXlsxFile(data)
		const [headerRow, ...dataRows] = dataExcel
		// Validar la estructura del archivo
		if (headerRow[0] !== 'CLAVE' || headerRow[1] !== 'VALOR') {
			throw new Error('El archivo Excel no tiene la estructura correcta')
		}
		const jsonGeneral = dataRows.map(row => {
			const objeto = {}
			row.forEach((value, index) => {
				objeto[headerRow[index]] = value
			})
			return objeto
		})
		return jsonGeneral[0].VALOR
	}
	useEffect(() => {
		const getVersion = async () => {
			try {
				const versionValue = await setVersionState()
				setVersion(versionValue)
			} catch (error) {
				console.error('Error al obtener la versión:', error)
				setVersion('Error al cargar')
			}
		}
		getVersion()
	}, [])

	return (
		<Popover>
			<PopoverTrigger>
				<div className="p-1 my-1 bg-white rounded cursor-pointer">
					<Settings className="w-6 h-6 text-primary" />
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Web Training Config</h4>
						<p className="text-sm text-muted-foreground">versión {version ? version : 'cargando...'}</p>
					</div>
					<Separator />
					<div className="grid gap-2">
						<div className="grid grid-cols-1 items-center">
							<Button
								variant="ghost"
								className="flex justify-between w-full"
								onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
								Cambiar de tema <Palette className="w-4 h-4 text-primary" />
							</Button>
							<ExcelDrawer />
							<Button variant="ghost" className="flex justify-between w-full">
								Reportar un problema <UserCog className="w-4 h-4 text-primary" />
							</Button>
							<Separator />
							<Button variant="ghost" className="flex justify-between w-full">
								Guia Web Training <BookOpenCheck className="w-4 h-4 text-primary" />
							</Button>
							<Separator />
							<Button variant="ghost" className="flex justify-between w-full">
								Salir <LogOut className="w-4 h-4 text-primary" />
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

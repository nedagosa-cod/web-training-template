import { Palette } from 'lucide-react'

import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			Cambiar de tema
			<DropdownMenuTrigger>Cambiar de tema</DropdownMenuTrigger>
			<DropdownMenuShortcut>
				<Palette className="h-4 w-4 mr-2 text-primary" />
			</DropdownMenuShortcut>
		</DropdownMenu>
	)
}

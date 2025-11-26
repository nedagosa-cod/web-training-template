import { Diamond, Home, HomeIcon, Info, Menu, User2 } from 'lucide-react'
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import NavItemRegular from './search/NavItemRegular'
import NavItemPortada from './search/NavItemPortada'
import NavItemLista from './search/NavItemLista'
import { icons } from '../../../../icons/icons-list'
import NavItemAppsWeb from './NavItemAppsWeb'

export function SecondaryNavbar({ data, activeSegment, className }) {
	return (
		<NavigationMenu className="w-full">
			<NavigationMenuList className={`flex items-center w-full flex-wrap py-1 gap-1 ${className}`}>
				{data.map((item, i) => {
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
	)
}

import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'
import { icons } from '@/icons/icons-list'
import { NavLink } from 'react-router-dom'
import { useNavigationMenuPosition } from '@/hooks/useNavigationMenuPosition'

export default function NavItemLista({ components, label, icon }) {
	const triggerRef = useRef(null)
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger
				ref={triggerRef}
				title={label}
				className="flex justify-center items-center px-4 py-1 w-fit h-[36px] text-primaryDark shadow-md bg-white hover:bg-primaryLight 2xl:w-40 rounded-full ring-2 ring-secondary">
				<span className="flex justify-center items-center mr-2 w-4 h-4">{icon}</span>
				<span className="hidden overflow-hidden text-xs font-bold text-center truncate whitespace-normal xl:block">
					{label}
				</span>
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
					{components.map((component, index) => (
						<ListItem
							key={`${index}-${component.title}`}
							title={component.title}
							href={component.route}
							iconItem={component.icon}
							parentIcon={icon}>
							{component.description ? component.description : label}
						</ListItem>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}

const ListItem = React.forwardRef(({ className, title, children, iconItem, parentIcon, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<NavLink
					to={props.href}
					ref={ref}
					className={cn(
						'block p-3 space-y-1 leading-none no-underline to-transparent rounded-md transition-colors outline-none select-none hover:bg-gradient-to-l from-secondarySoft hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<span className="flex items-center mr-2 text-primary">
						{iconItem ? (
							<span className="flex justify-center items-center mr-2 w-4 h-4">{icons[iconItem]}</span>
						) : (
							parentIcon
						)}
						<div className="text-sm font-medium leading-none">{title}</div>
					</span>
					<div>
						<p className="text-sm leading-snug line-clamp-2 text-muted-foreground">{children}</p>
					</div>
				</NavLink>
			</NavigationMenuLink>
		</li>
	)
})

ListItem.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	href: PropTypes.string.isRequired,
}

ListItem.displayName = 'ListItem'

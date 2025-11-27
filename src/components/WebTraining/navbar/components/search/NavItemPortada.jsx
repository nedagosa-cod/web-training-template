import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import PropTypes from 'prop-types'
import { icons } from '../../../../../icons/icons-list'
import { NavLink } from 'react-router-dom'
import { useNavigationMenuPosition } from '@/hooks/useNavigationMenuPosition'

export default function NavItemPortada({ label, icon, submenu, containerRef }) {
	const triggerRef = useNavigationMenuPosition()
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
				<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
					{submenu.map((item, index) =>
						index === 0 ? (
							<li className="row-span-4" key={index}>
								<div className="flex flex-col justify-end p-5 w-full h-full bg-gradient-to-b rounded-md outline-none select-none from-muted/50 to-muted">
									<div className="flex justify-center items-center mt-4 mb-2 text-lg font-medium">
										{icon}
										{item.title}
									</div>
									<p className="text-sm leading-tight text-muted-foreground">{item.description && item.description}</p>
								</div>
							</li>
						) : (
							<ListItem href={item.route} title={item.title} key={index} iconItem={item.icon} parentIcon={icon}>
								{item.description ? item.description : ''}
							</ListItem>
						)
					)}
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
						'flex flex-col p-3 space-y-1 leading-none no-underline rounded-md transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
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
					<div className="flex flex-col gap-2">
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

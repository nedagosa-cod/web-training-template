import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

export default function NavItemRegular({ label, href, icon }) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				title={label}
				className="flex justify-center items-center px-4 py-1 w-fit h-[36px] text-primaryDark shadow-md bg-white hover:text-primaryDark hover:bg-primaryLight 2xl:w-40 rounded-full ring-2 ring-secondary font-bold"
				href={href}>
				<span className="flex justify-center items-center mr-2 w-4 h-4">{icon}</span>
				<span className="overflow-hidden text-xs truncate whitespace-normal xl:block">{label}</span>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}

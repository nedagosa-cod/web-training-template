import { Button } from '@/components/ui/button'
import { AppWindow, MousePointerClick } from 'lucide-react'
import { Link } from 'react-router-dom'
export const LinkDesc = ({ url, buttonName }) => {
	return (
		<Button>
			<Link className="flex items-center justify-between" to={url} target="__blank">
				<p>{buttonName}&nbsp;&nbsp;</p>
				<div className="flex">
					<AppWindow />
					<MousePointerClick className="w-2 h-2" />
				</div>
			</Link>
		</Button>
	)
}

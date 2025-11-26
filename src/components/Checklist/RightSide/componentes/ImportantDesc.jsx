import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, X } from 'lucide-react'

const ImportantDesc = ({ children, title }) => {
	return (
		<Card className="relative w-full max-w-md overflow-hidden border-2 border-primary bg-white shadow-lg hover:shadow-xl my-4">
			<div className="absolute inset-0 bg-red-50" />
			<div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />

			<div className="relative flex items-center justify-between p-4">
				<div className="flex items-center gap-3">
					<div className="rounded-full bg-primary p-2">
						<AlertTriangle className="h-5 w-5 text-white" />
					</div>
					<CardHeader className="p-0">
						<CardTitle className="text-lg font-bold text-primary">IMPORTANTE</CardTitle>
						<CardDescription className="text-md text-primary">{title}</CardDescription>
					</CardHeader>
				</div>
			</div>

			<CardContent className="relative pb-5">
				<p className="text-sm text-gray-800">{children}</p>
			</CardContent>
		</Card>
	)
}
export default ImportantDesc

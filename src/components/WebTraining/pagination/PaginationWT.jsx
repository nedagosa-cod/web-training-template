import { Button } from '@/components/ui/button'
import React from 'react'

export default function PaginationWT({ pagina, totalPaginas, setPagina }) {
	return (
		<div className="flex z-10 gap-2 items-center mx-auto my-4" data-pagination="true">
			<Button
				onClick={() => setPagina(p => Math.max(p - 1, 1))}
				disabled={pagina === 1}
				className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
				Anterior
			</Button>

			<span className="text-xs">
				Página {pagina} de {totalPaginas}
			</span>

			<Button
				onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
				disabled={pagina === totalPaginas}
				className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
				Siguiente
			</Button>
		</div>
	)
}

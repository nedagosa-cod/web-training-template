import { CheckListProvider } from '../../context/ChecklistContext'
import Checklist from './Checklist'
import ejemploA from './BASES/ejemploA.json'
import ejemploB from './BASES/ejemploB.json'
import ejemploC from './BASES/ejemploB.json'
import checkplantilla from './BASES/plantillaCheck.json'

const CheckListBase = ({ checklist }) => {
	const cheklists = {
		checkplantilla,
		ejemploA,
		ejemploB,
		ejemploC,
	}
	return (
		<CheckListProvider>
			<section className={'w-full h-full flex justify-center items-center overflow-hidden transition-all duration-300'}>
				<Checklist dataCheckList={cheklists[checklist]} />
			</section>
		</CheckListProvider>
	)
}

export default CheckListBase

import React, { useContext, useEffect, useState } from 'react'
import './admin.scss'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import TitleDesc from './RightSide/componentes/TitleDesc'
import ParagraphDesc from './RightSide/componentes/ParagraphDesc'
import ListDesc from './RightSide/componentes/ListDesc'
import { LinkDesc } from './RightSide/componentes/LinkDesc'
import ImageDesc from './RightSide/componentes/ImageDesc'
import SubtitleDesc from './RightSide/componentes/SubtitleDesc'
import ImportantDesc from './RightSide/componentes/ImportantDesc'
import ScriptDesc from './RightSide/componentes/ScriptDesc'
import ValBoolDesc from './RightSide/componentes/ValBoolDesc'
import ValTextDesc from './RightSide/componentes/ValTextDesc'
import ValDateDesc from './RightSide/componentes/ValDateDesc'
import ValListDesc from './RightSide/componentes/ValListDesc'
import InsideAnswer from './RightSide/componentes/InsideAnswer'
import CheckListContext from '../../context/ChecklistContext'

import ChangeSteep from './RightSide/componentes/ChangeSteep'
import Estructure from './BigIcons/Estructure'
import Note from './RightSide/componentes/Note'
import Split from 'react-split'
// import MenuEdit from './RightSide/MenuEdit'
import GlobalContext from '../../context/GlobalContext'
import { IconPlus } from '../../icons/IconPlus'
import IconParagraphOt from '../../icons/IconParagraphOt'
import IconTitleOt from '../../icons/IconTitleOt'
import IconListOt from '../../icons/IconListOt'
import IconImageOt from '../../icons/IconImageOt'
import IconScriptOt from '../../icons/IconScriptOt'
import IconChatOt from '../../icons/IconChatOt'
import IconHrOt from '../../icons/IconHrOt'
import IconOtherOt from '../../icons/IconOtherOt'
import IconBoxTextOt from '../../icons/IconBoxTextOt'
import IconVlistOt from '../../icons/IconVlistOt'
import IconVtextOt from '../../icons/IconVtextOt'
import IconVboolOt from '../../icons/IconVboolOt'
import IconDateOt from '../../icons/IconDateOt'
import IconChangeStepOt from '../../icons/IconChangeStepOt'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'

export default function Checklist({ dataCheckList }) {
	const { resetCheckList, activeInside, respuestas, setRespuestas, setScrollReached } = useContext(CheckListContext)
	const { admin } = useContext(GlobalContext)
	const [textArea, setTextArea] = useState('')

	const itemsElemets = [
		{
			name: 'Titulo',
			icon: <IconTitleOt />,
		},
		{
			name: 'Párrafo',
			icon: <IconParagraphOt />,
		},
		{
			name: 'Lista',
			icon: <IconListOt />,
		},
		{
			name: 'Imagen',
			icon: <IconImageOt />,
		},
		{
			name: 'Script/Guión',
			icon: <IconScriptOt />,
		},

		{
			name: 'Nota resaltada',
			icon: <IconChatOt />,
		},
		{
			name: 'Espacio',
			icon: <IconHrOt />,
		},
		{
			name: 'Botón URL',
			icon: <IconOtherOt />,
		},
		{
			name: 'Información resaltada',
			icon: <IconBoxTextOt />,
		},
		{
			name: 'Validación de texto',
			icon: <IconVtextOt />,
		},
		{
			name: 'Validación de fecha',
			icon: <IconDateOt />,
		},
		{
			name: 'Validación Si/No',
			icon: <IconVboolOt />,
		},
		{
			name: 'Validación de lista',
			icon: <IconVlistOt />,
		},
		{
			name: 'Boton salto de paso',
			icon: <IconChangeStepOt />,
		},
	]

	const [checkListSelected, setCheckListSelected] = useState(dataCheckList)

	const renderElement = (element, index, desc) => {
		const setTextProperties = text => {
			let boldRegex = /&bold(.*?)&bold/g
			let cursRegex = /&curs(.*?)&curs/g
			let tipRegex = /&tip\[(.*?)\](.*?)&tip/g
			let textBold = text.replace(boldRegex, (match, content) => {
				return '<strong>' + content + '</strong>'
			})
			let textCurs = textBold.replace(cursRegex, (match, content) => {
				return '<i>' + content + '</i>'
			})
			let textTip = textCurs.replace(tipRegex, (match, content1, content2) => {
				return (
					'<span className="relative px-1 font-bold rounded cursor-default group" id="parentTool">' +
					content2 +
					'<div className="hidden absolute left-0 top-5 p-1 w-24 text-sm text-white rounded cursor-default text-wrap z-100 text-primary bg-primary group-hover:block" id="toolTip">' +
					content1 +
					'</div></span>'
				)
			})
			return textTip
		}
		const renderParagraph = (element, key) => (
			<ParagraphDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
				{/* <span dangerouslySetInnerHTML={{ __html: setTextProperties(element.P) }} /> */}
				{setTextProperties(element.P)}
			</ParagraphDesc>
		)

		const renderLink = (element, key) => <LinkDesc url={element.LINK} buttonName={element.NAME} key={key} />
		// imagen en la descripcion
		const renderImage = (element, key) => (
			<ImageDesc
				key={key}
				img={element.IMG}
				width={element.SPACE}
				check={desc.check}
				location={index}
				updateUserCheck={setCheckListSelected}
			/>
		)

		const renderSubtitle = (element, key) => (
			<SubtitleDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
				{element.SUBTITLE}
			</SubtitleDesc>
		)

		const renderList = (element, key) => {
			return (
				<>
					{Array.isArray(element.LIST) ? (
						<ListDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.LIST.map((list, j) => (
								<li key={j} dangerouslySetInnerHTML={{ __html: setTextProperties(list) }} />
							))}
						</ListDesc>
					) : (
						<ListDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.LIST}
						</ListDesc>
					)}
				</>
			)
		}
		const renderScript = (element, key) => {
			return (
				<>
					{Array.isArray(element.SCRIPTS) ? (
						<ScriptDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.SCRIPTS.map((script, j) => (
								<span key={j} dangerouslySetInnerHTML={{ __html: setTextProperties(script) }} />
							))}
						</ScriptDesc>
					) : (
						<ScriptDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
							{element.SCRIPTS}
						</ScriptDesc>
					)}
				</>
			)
		}
		const renderImportant = (element, key) => (
			<ImportantDesc title={element.TITLE} key={key}>
				<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.IMPORTANT) }} />
			</ImportantDesc>
		)

		const renderValText = (element, key) => (
			<ValTextDesc
				position={element.POS}
				key={key}
				value={respuestas[element.POS] || ''}
				onChange={valor => actualizarRespuesta(element.POS, valor, element.DATA_TEXT)}>
				{element.DATA_TEXT}
			</ValTextDesc>
		)

		const renderValDate = (element, key) => (
			<ValDateDesc
				position={element.POS}
				key={key}
				value={respuestas[element.POS]?.value || ''}
				onChange={valor => actualizarRespuesta(element.POS, valor, element.DATA_DATE)}>
				{element.DATA_DATE}
			</ValDateDesc>
		)

		const renderValBool = (element, key) => (
			<ValBoolDesc
				position={element.POS}
				title={element.DATA_BOOL}
				key={key}
				finish={element.FINISH}
				to={checkListSelected.DESCRIPCIONES.length}
				value={respuestas[element.POS]?.value || ''}
				onChange={valor => actualizarRespuesta(element.POS, valor, element.DATA_BOOL)}>
				<InsideAnswer answer="SI" position={element.POS}>
					{element.SI.map((subElement, j) => renderElement(subElement, j, desc))}
				</InsideAnswer>
				<InsideAnswer answer="NO" position={element.POS}>
					{element.NO.map((subElement, j) => renderElement(subElement, j, desc))}
				</InsideAnswer>
			</ValBoolDesc>
		)

		const renderValList = (element, key) => (
			<ValListDesc
				title={element.DATA_LIST}
				position={element.POS}
				list={element.OPTIONS.map(option => option.NAME)}
				key={key}
				value={respuestas[element.POS]?.value || ''}
				onChange={valor => actualizarRespuesta(element.POS, valor, element.DATA_LIST)}>
				{element.OPTIONS.map((option, l) => (
					<InsideAnswer answer={option.NAME} position={element.POS} key={l}>
						{option.HTML.map((subElement, j) => renderElement(subElement, j, desc))}
					</InsideAnswer>
				))}
			</ValListDesc>
		)

		const renderChangeSteep = (element, key) => (
			<ChangeSteep key={key} to={element.TO}>
				{element.BTN_JUMP}
			</ChangeSteep>
		)

		const renderNote = (element, key) => (
			<Note
				key={key}
				type={element.TYPE ? element.TYPE : 'info'}
				title={element.TITLE ? element.TITLE : '[Sin Titulo]'}>
				<span dangerouslySetInnerHTML={{ __html: setTextProperties(element.NOTA) }} />
			</Note>
		)

		const renderMarco = (element, key) => (
			<div style={{ width: '26rem' }} key={key}>
				<Estructure />
			</div>
		)

		const renderBR = (element, key) => {
			const size = {
				1: '1rem',
				2: '2rem',
				3: '4rem',
				4: '6rem',
			}
			return <div style={{ height: size[element.BR], padding: size[element.HR] }} key={key} />
		}

		const creatingElement = () => {
			const key = `${desc.check}_${index}`
			switch (true) {
				case !!element.P:
					return renderParagraph(element, key)
				case !!element.LINK:
					return renderLink(element, key)
				case !!element.IMG:
					return renderImage(element, key)
				case !!element.SUBTITLE:
					return renderSubtitle(element, key)
				case !!element.LIST:
					return renderList(element, key)
				case !!element.IMPORTANT:
					return renderImportant(element, key)
				case !!element.SCRIPTS:
					return renderScript(element, key)
				case !!element.DATA_TEXT:
					return renderValText(element, key)
				case !!element.DATA_DATE:
					return renderValDate(element, key)
				case !!element.DATA_BOOL:
					return renderValBool(element, key)
				case !!element.DATA_LIST:
					return renderValList(element, key)
				case !!element.BTN_JUMP:
					return renderChangeSteep(element, key)
				case !!element.NOTA:
					return renderNote(element, key)
				case !!element.MARCO:
					return renderMarco(element, key)
				case !!element.BR:
					return renderBR(element, key)
				default:
					return null
			}
		}

		// return !element.BR ? (
		// 	<MenuEdit key={index} check={desc.check} location={index}>
		// 		{creatingElement()}
		// 	</MenuEdit>
		// ) : (
		// 	creatingElement()
		// )
		return creatingElement()
	}

	const [descripciones, setDescripciones] = useState([])

	const createUserElement = (elName, check) => {
		const objetElecment = () => {
			switch (elName) {
				case 'Titulo':
					return { SUBTITLE: 'XXXXX' }
				case 'Párrafo':
					return { P: '- XXXXX' }
				case 'Lista':
					return { LIST: ['XXX', 'XXX', 'XXX'] }
				case 'Imagen':
					return { IMG: '#', SPACE: '50%' }
				case 'Script/Guión':
					return { SCRIPTS: '<p>XXX</p>' }
				case 'Nota resaltada':
					return { IMPORTANT: 'XXXXX', TITLE: 'XXXXX' }
				case 'Espacio':
					return { BR: '1' }
				case 'Botón URL':
					return { LINK: '#', NAME: 'XXXXX' }
				case 'Información resaltada':
					return {
						NOTA: 'XXXXX',
						TITLE: 'XXXXX',
						TYPE: 'info',
					}
				case 'Validación de texto':
					return { DATA_TEXT: 'XXXXX', POS: 'Z' }
				case 'Validación de fecha':
					return { DATA_DATE: 'XXXXX', POS: 'X' }
				case 'Validación Si/No':
					return {
						DATA_BOOL: 'XXXXX',
						POS: 'Y',
						FINISH: '',
						SI: [],
						NO: [],
					}
				case 'Validación de lista':
					return {
						DATA_LIST: 'XXXXX',
						POS: 'W',
						OPTIONS: [
							{
								NAME: 'XXXXX',
								HTML: [
									{
										P: 'XXXXX',
									},
								],
							},
						],
					}
				case 'Boton salto de paso':
					return {
						BTN_JUMP: 'XXXXX',
						TO: 'A',
					}
			}
		}

		setCheckListSelected(prevState => ({
			...prevState,
			DESCRIPCIONES: prevState.DESCRIPCIONES.map(description => {
				if (description.check === check) {
					return {
						...description,
						html: [...description.html, objetElecment(elName)],
					}
				} else {
					return description
				}
			}),
		}))
	}
	// Verificamos si ENDSCRROLL es true, si es el caso se verifica que el scroll haya llegado al final y se guarda el dato
	const contadorScrool = (e, descripcion) => {
		if (descripcion.ENDSCRROLL === 'true') {
			const el = e.target
			const bottomReached = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
			setScrollReached(bottomReached)
		}
	}
	const fixDescriptions = () => {
		let result = checkListSelected.DESCRIPCIONES.map((element, i) => {
			let data = {
				check: element.check,
				endscroll: element.ENDSCROLL,
				html: () => {
					return (
						<>
							{element.html.map((list, l) => {
								if (list.TITULO) {
									return <TitleDesc key={element.check + '_' + l}>{list.TITULO}</TitleDesc>
								}
								return null
							})}
							<article
								onScroll={e => contadorScrool(e, element)}
								className="w-full flex overflow-y-auto overflow-x-hidden  h-full flex-col items-center py-2 px-4 gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
								{element.html.map((list, j) => {
									return renderElement(list, j, element)
								})}
								{admin && (
									<>
										<div className="flex flex-wrap gap-2 p-1 mt-2 w-full bg-gray-100 rounded-md box-buttons-elemets">
											{itemsElemets.map((item, i) => {
												return (
													<button
														key={i}
														type="button"
														className="flex px-2 py-1 bg-white rounded-md cursor-pointer box-buttons-elemets__button"
														onClick={e => createUserElement(item.name, element.check)}>
														<div>{item.icon}</div> {item.name}
													</button>
												)
											})}
										</div>
										<div
											key={'admin_add_check' + i}
											className={'admin ' + 'on' + ' add-check'}
											onClick={() => console.log('hola')}>
											<IconPlus />
										</div>
									</>
								)}
							</article>
						</>
					)
				},
			}
			return data
		})
		setDescripciones(result)
	}

	const saveFormat = () => {
		const JSONtext = JSON.stringify(checkListSelected)
		const blob = new Blob([JSONtext], { type: 'text/plain' })
		const enlace = document.createElement('a')
		enlace.href = URL.createObjectURL(blob)
		enlace.download = 'formatoChecklist-' + checkListSelected.TITLE + '.txt'

		// Simular un clic en el enlace
		enlace.click()

		// Liberar el objeto URL
		URL.revokeObjectURL(enlace.href)
	}
	useEffect(() => {
		if (activeInside) {
			setCheckListSelected(dataCheckList)
		}
	}, [dataCheckList])

	useEffect(() => {
		resetCheckList()
		fixDescriptions()
		setRespuestas({})
	}, [checkListSelected])
	// Funcion para recoger valores de los render
	const actualizarRespuesta = (pos, valor, label) => {
		const clave = `${pos}. ${label}`

		// Si es un objeto tipo fecha
		let valorFormateado = valor
		if (valor instanceof Date && !isNaN(valor)) {
			valorFormateado = valor.toISOString().split('T')[0]
		}

		setRespuestas(prev => ({
			...prev,
			[clave]: valorFormateado,
		}))
	}

	return (
		<Card className="flex overflow-x-hidden relative z-0 flex-col w-3/4 h-4/5 rounded-2xl ring-8 shadow-lg ring-primary/20">
			<section className="flex overflow-hidden w-full h-full text-sm">
				<Split className="flex flex-row w-full" minSize={400} dragInterval={10} sizes={[50, 50]}>
					<LeftSide
						title={checkListSelected.TITLE}
						data={checkListSelected.DESCRIPCIONES}
						updateCheck={setCheckListSelected}
					/>
					{/* <div className="gutter gutter-horizontal" style="width: 10px;"></div> */}
					<RightSide descripciones={descripciones} updateCheck={setCheckListSelected} />
				</Split>
			</section>
			<section className="flex gap-2 justify-around items-center w-full h-20">
				<Button
					className=""
					type="reset"
					onClick={() => {
						resetCheckList()
					}}>
					<span className="">Reiniciar</span>
				</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							onClick={() => {
								// Convertimos respuestas a un formato textual
								const respuestasTextuales = Object.entries(respuestas)
									.map(([clave, valor]) => `${clave}: ${valor}`)
									.join('\n') // Unimos cada línea con saltos de línea

								setTextArea(respuestasTextuales)
							}}>
							Obtener datos
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Validaciones</DialogTitle>
							<DialogDescription>Los datos capturados de las validaciones de datos del checklist</DialogDescription>
						</DialogHeader>
						<Textarea
							placeholder="Type your message here."
							value={textArea}
							onChange={e => setTextArea(e.target.value)}
						/>
						<Button
							type="button"
							onClick={() => {
								navigator.clipboard.writeText(textArea)
								toast.success('Copiado al portapapeles')
							}}>
							Copiar
						</Button>
					</DialogContent>
				</Dialog>

				{/* <Button onClick={() => saveFormat()} type="button">
					GENERAR FORMATO
				</Button>
				<Button
					onClick={() => {
						saveFormat(true)
					}}
					type="button">
					TEST
				</Button> */}
			</section>
		</Card>
	)
}

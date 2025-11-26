import React from 'react'
import ParagraphDesc from '../RightSide/componentes/ParagraphDesc'
import ListDesc from '../RightSide/componentes/ListDesc'
import { LinkDesc } from '../RightSide/componentes/LinkDesc'
import ImageDesc from '../RightSide/componentes/ImageDesc'
import SubtitleDesc from '../RightSide/componentes/SubtitleDesc'
import ImportantDesc from '../RightSide/componentes/ImportantDesc'
import ScriptDesc from '../RightSide/componentes/ScriptDesc'
import ValBoolDesc from '../RightSide/componentes/ValBoolDesc'
import ValTextDesc from '../RightSide/componentes/ValTextDesc'
import ValDateDesc from '../RightSide/componentes/ValDateDesc'
import ValListDesc from '../RightSide/componentes/ValListDesc'
import InsideAnswer from '../RightSide/componentes/InsideAnswer'
import ChangeSteep from '../RightSide/componentes/ChangeSteep'
import Estructure from '../BigIcons/Estructure'
import Note from '../RightSide/componentes/Note'
import MenuEdit from '../RightSide/MenuEdit'
import { IconPlus } from '../../../icons/IconPlus'
import IconParagraphOt from '../../../icons/IconParagraphOt'
import IconTitleOt from '../../../icons/IconTitleOt'
import IconListOt from '../../../icons/IconListOt'
import IconImageOt from '../../../icons/IconImageOt'
import IconScriptOt from '../../../icons/IconScriptOt'
import IconChatOt from '../../../icons/IconChatOt'
import IconHrOt from '../../../icons/IconHrOt'
import IconOtherOt from '../../../icons/IconOtherOt'
import IconBoxTextOt from '../../../icons/IconBoxTextOt'
import IconVlistOt from '../../../icons/IconVlistOt'
import IconVtextOt from '../../../icons/IconVtextOt'
import IconVboolOt from '../../../icons/IconVboolOt'
import IconDateOt from '../../../icons/IconDateOt'
import IconChangeStepOt from '../../../icons/IconChangeStepOt'

// Utilidad para formatear texto especial
export function setTextProperties(text) {
	if (!text) return ''
	let boldRegex = /&bold(.*?)&bold/g
	let cursRegex = /&curs(.*?)&curs/g
	let tipRegex = /&tip\[(.*?)\](.*?)&tip/g
	let textBold = text.replace(boldRegex, (match, content) => `<strong>${content}</strong>`)
	let textCurs = textBold.replace(cursRegex, (match, content) => `<i>${content}</i>`)
	let textTip = textCurs.replace(
		tipRegex,
		(match, content1, content2) =>
			`<span class="relative font-bold cursor-default px-1 rounded group" id="parentTool">${content2}<div class="absolute top-5 left-0 text-white cursor-default hidden w-24 text-wrap text-sm z-100 text-primary bg-primary p-1 rounded group-hover:block" id="toolTip">${content1}</div></span>`
	)
	return textTip
}

// Lista de elementos disponibles para agregar
export const itemsElemets = [
	{ name: 'Titulo', icon: <IconTitleOt /> },
	{ name: 'Párrafo', icon: <IconParagraphOt /> },
	{ name: 'Lista', icon: <IconListOt /> },
	{ name: 'Imagen', icon: <IconImageOt /> },
	{ name: 'Script/Guión', icon: <IconScriptOt /> },
	{ name: 'Nota resaltada', icon: <IconChatOt /> },
	{ name: 'Espacio', icon: <IconHrOt /> },
	{ name: 'Botón URL', icon: <IconOtherOt /> },
	{ name: 'Información resaltada', icon: <IconBoxTextOt /> },
	{ name: 'Validación de texto', icon: <IconVtextOt /> },
	{ name: 'Validación de fecha', icon: <IconDateOt /> },
	{ name: 'Validación Si/No', icon: <IconVboolOt /> },
	{ name: 'Validación de lista', icon: <IconVlistOt /> },
	{ name: 'Boton salto de paso', icon: <IconChangeStepOt /> },
]

// Renderizadores de cada tipo de elemento
export function renderElement(element, index, desc, setCheckListSelected) {
	const key = `${desc.check}_${index}`
	// Renderizadores individuales
	const renderParagraph = (element, key) => (
		<ParagraphDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
			{setTextProperties(element.P)}
		</ParagraphDesc>
	)
	const renderLink = (element, key) => <LinkDesc url={element.LINK} buttonName={element.NAME} key={key} />
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
	const renderList = (element, key) => (
		<ListDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
			{Array.isArray(element.LIST)
				? element.LIST.map(list => setTextProperties(list))
				: setTextProperties(element.LIST)}
		</ListDesc>
	)
	const renderScript = (element, key) => (
		<ScriptDesc key={key} check={desc.check} location={index} updateUserCheck={setCheckListSelected}>
			{Array.isArray(element.SCRIPTS)
				? element.SCRIPTS.map(script => setTextProperties(script))
				: setTextProperties(element.SCRIPTS)}
		</ScriptDesc>
	)
	const renderImportant = (element, key) => (
		<ImportantDesc title={element.TITLE} key={key}>
			{setTextProperties(element.IMPORTANT)}
		</ImportantDesc>
	)
	const renderValText = (element, key) => (
		<ValTextDesc position={element.POS} key={key}>
			{element.DATA_TEXT}
		</ValTextDesc>
	)
	const renderValDate = (element, key) => (
		<ValDateDesc position={element.POS} key={key}>
			{element.DATA_DATE}
		</ValDateDesc>
	)
	const renderValBool = (element, key) => (
		<ValBoolDesc
			position={element.POS}
			title={element.DATA_BOOL}
			key={key}
			finish={element.FINISH}
			to={desc.DESCRIPCIONES?.length || 0}>
			<InsideAnswer answer="SI" position={element.POS}>
				{element.SI?.map((subElement, j) => renderElement(subElement, j, desc, setCheckListSelected))}
			</InsideAnswer>
			<InsideAnswer answer="NO" position={element.POS}>
				{element.NO?.map((subElement, j) => renderElement(subElement, j, desc, setCheckListSelected))}
			</InsideAnswer>
		</ValBoolDesc>
	)
	const renderValList = (element, key) => (
		<ValListDesc
			title={element.DATA_LIST}
			position={element.POS}
			list={element.OPTIONS.map(option => option.NAME)}
			key={key}>
			{element.OPTIONS.map((option, l) => (
				<InsideAnswer answer={option.NAME} position={element.POS} key={l}>
					{option.HTML.map((subElement, j) => renderElement(subElement, j, desc, setCheckListSelected))}
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
		<Note key={key} type={element.TYPE ? element.TYPE : 'info'} title={element.TITLE ? element.TITLE : '[Sin Titulo]'}>
			{setTextProperties(element.NOTA)}
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

	// Selección de renderizador según el tipo de elemento
	const creatingElement = () => {
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

	return !element.BR ? (
		<MenuEdit key={index} check={desc.check} location={index}>
			{creatingElement()}
		</MenuEdit>
	) : (
		creatingElement()
	)
}

// Creador de nuevos elementos para el usuario
export function createUserElement(elName, check, prevState) {
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
				return { NOTA: 'XXXXX', TITLE: 'XXXXX', TYPE: 'info' }
			case 'Validación de texto':
				return { DATA_TEXT: 'XXXXX', POS: 'Z' }
			case 'Validación de fecha':
				return { DATA_DATE: 'XXXXX', POS: 'X' }
			case 'Validación Si/No':
				return { DATA_BOOL: 'XXXXX', POS: 'Y', FINISH: '', SI: [], NO: [] }
			case 'Validación de lista':
				return {
					DATA_LIST: 'XXXXX',
					POS: 'W',
					OPTIONS: [
						{
							NAME: 'XXXXX',
							HTML: [{ P: 'XXXXX' }],
						},
					],
				}
			case 'Boton salto de paso':
				return { BTN_JUMP: 'XXXXX', TO: 'A' }
			default:
				return {}
		}
	}
	return {
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
	}
}

// Fija las descripciones para el renderizado en RightSide
export function fixDescriptions(checkListSelected, setCheckListSelected, admin, handleCreateUserElement) {
	return checkListSelected.DESCRIPCIONES.map((element, i) => {
		return {
			check: element.check,
			html: () => (
				<>
					{element.html.map((list, l) => {
						if (list.TITULO) {
							return <SubtitleDesc key={element.check + '_' + l}>{list.TITULO}</SubtitleDesc>
						}
						return null
					})}
					<article className="w-full flex overflow-y-auto overflow-x-hidden  h-full flex-col items-center py-2 px-4 gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
						{element.html.map((list, j) => renderElement(list, j, element, setCheckListSelected))}
						{admin && (
							<>
								<div className="box-buttons-elemets flex flex-wrap mt-2 gap-2 w-full p-1 bg-gray-100 rounded-md">
									{itemsElemets.map((item, idx) => (
										<button
											key={idx}
											type="button"
											className="box-buttons-elemets__button flex bg-white py-1 px-2 rounded-md cursor-pointer"
											onClick={() => handleCreateUserElement(item.name, element.check)}>
											<div>{item.icon}</div> {item.name}
										</button>
									))}
								</div>
								<div
									key={'admin_add_check' + i}
									className={'admin on add-check'}
									onClick={() => console.log('Agregar nuevo check')}>
									<IconPlus />
								</div>
							</>
						)}
					</article>
				</>
			),
		}
	})
}

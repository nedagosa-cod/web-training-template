import IconSucces from '../../../../icons/IconSucces'
import IconError from '../../../../icons/IconError'
import IconWarning from '../../../../icons/IconWarning'
import IconQuestion from '../../../../icons/IconQuestion'
import IconInfo from '../../../../icons/IconInfo'

const Note = ({ children, title, type }) => {
	const icons = {
		success: <IconSucces />,
		error: <IconError />,
		warning: <IconWarning />,
		info: <IconInfo />,
		question: <IconQuestion />,
	}
	return (
		<section
			className={'flex w-11/12 p-2 rounded-lg border-2 border-black mt-2'}
			style={{
				backgroundColor:
					type === 'warning'
						? '#fff4de'
						: type === 'error'
						? '#ffdede'
						: type === 'success'
						? '#e4ffde'
						: type === 'info'
						? '#def9ff'
						: type === 'question'
						? '#defff4'
						: 'transparent',
				borderColor:
					type === 'warning'
						? '#ff8300'
						: type === 'error'
						? '#9c1111'
						: type === 'success'
						? '#5cb85c'
						: type === 'info'
						? '#5968ff'
						: type === 'question'
						? '#68ada8'
						: 'transparent',
			}}>
			<div className="w-6 h-6 flex items-center justify-center mr-1 mt-1 ">{icons[type]}</div>
			<div>
				<span
					className="block mb-1 w-full font-bold text-lg"
					style={{
						color:
							type === 'warning'
								? '#ff8300'
								: type === 'error'
								? '#d9534f'
								: type === 'success'
								? '#5cb85c'
								: type === 'info'
								? '#5968ff'
								: type === 'question'
								? '#68ada8'
								: 'transparent',
					}}>
					{title}
				</span>
				{children}
			</div>
		</section>
	)
}
export default Note

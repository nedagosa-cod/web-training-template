import { Extension } from '@tiptap/core'

const ExFontSize = Extension.create({
	name: 'fontSize',

	addOptions() {
		return {
			types: ['textStyle'],
		}
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					fontSize: {
						default: null,
						renderHTML: attributes => {
							if (!attributes.fontSize) {
								return {}
							}
							return {
								style: `font-size: ${attributes.fontSize}`,
							}
						},
						parseHTML: element => ({
							fontSize: element.style.fontSize,
						}),
					},
				},
			},
		]
	},

	addCommands() {
		return {
			setFontSize:
				size =>
					({ chain }) => {
						return chain().setMark('textStyle', { fontSize: size }).run()
					},
		}
	},
})

export default ExFontSize

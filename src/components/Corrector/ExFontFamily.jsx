import { Extension } from '@tiptap/core'

const ExFontFamily = Extension.create({
	name: 'fontFamily',

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
					fontFamily: {
						default: null,
						renderHTML: attributes => {
							if (!attributes.fontFamily) {
								return {}
							}
							return {
								class: attributes.fontFamily,
							}
						},
						parseHTML: element => ({
							fontFamily: element.getAttribute('class'),
						}),
					},
				},
			},
		]
	},

	addCommands() {
		return {
			setFontFamily:
				family =>
					({ chain }) => {
						return chain().setMark('textStyle', { fontFamily: family }).run()
					},
		}
	},
})

export default ExFontFamily

import { Mark, mergeAttributes } from '@tiptap/core'

const ExTextColor = Mark.create({
	name: 'textColor',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	addAttributes() {
		return {
			color: {
				default: null,
				parseHTML: element => element.style.color || null,
				renderHTML: attributes => {
					if (!attributes.color) {
						return {}
					}

					return {
						style: `color: ${attributes.color}`,
					}
				},
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'span[style*=color]',
			},
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	addCommands() {
		return {
			setColor:
				color =>
					({ chain }) => {
						return chain().setMark(this.name, { color }).run()
					},
			unsetColor:
				() =>
					({ chain }) => {
						return chain().unsetMark(this.name).run()
					},
		}
	},
})

export default ExTextColor

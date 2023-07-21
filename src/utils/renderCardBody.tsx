import { czechKeywords, czechNumericKeywords, keywords, numericKeywords } from '@/data/keyWords'
import { Hr, Paragraph } from '@/styles/commonStyledComponents'
import { actionIcons, createActionIcon } from './createActionIcon'

export default function renderCardBody(body: string, cardWidth: number) {
	const emphasizeWords = (paragraph: string) => {
		const words = paragraph.split(' ')
		const actionIndex = words.findIndex((word) =>
			Object.keys(actionIcons).includes(word),
		)

		return words.map((word, index) => {
			const shouldBeEmphesized = (
				index < actionIndex ||
				keywords.includes(word) || (
					// Numeric keywords should only be emphesized when used
					// together with a number
					// TODO Bulk should be emphasized also when followed by "L"
					numericKeywords.includes(word ) &&
					!isNaN(Number(words[index + 1]))
				) || (
					czechKeywords.includes(word)
				) || (
					czechNumericKeywords.includes(word ) &&
					!isNaN(Number(words[index + 1]))
				)
			)
			const icon = createActionIcon(word, index, cardWidth)
			return icon ? (
				icon
			) : shouldBeEmphesized ? (
				<b key={index}>{word} </b>
			) : (
				<span key={index}>{word} </span>
			)
		})
	}


	const createParagrahps = () => {
		const paragraphs = body.split('\n')

		return paragraphs.map((paragraph, index) => {
			return paragraph === '-' && index < paragraphs.length ? (
				<Hr key={index} />
			) : (
				<Paragraph key={index}>{emphasizeWords(paragraph)}</Paragraph>
			)
		})
	}

	const paragraphs = createParagrahps()

	return <>{paragraphs}</>
}

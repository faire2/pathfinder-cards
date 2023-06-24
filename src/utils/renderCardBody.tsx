import { czechKeywords, czechNumericKeywords, keywords, numericKeywords } from '@/data/keyWords'
import Image from 'next/image'
import { styled } from 'styled-components'

export default function renderCardBody(body: string, cardWidth: number) {
	const emphasizeWords = (paragraph: string) => {
		const words = paragraph.split(' ')
		const actionIndex = words.findIndex((word) =>
			Object.keys(actionIconsRefs).includes(word),
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
			const iconData = actionIconsRefs[word]
			return iconData ? (
				<span key={index}>
					<Image
						src={iconData[0]}
						width={cardWidth / 6}
						height={cardWidth / 6}
						alt={iconData[2]}
						key={index}
					/>{' '}
				</span>
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
				<hr key={index} />
			) : (
				<Paragraph key={index}>{emphasizeWords(paragraph)}</Paragraph>
			)
		})
	}

	const paragraphs = createParagrahps()



	return <>{paragraphs}</>
}

const actionIconsRefs: Record<string, string[]> = {
	'(a)': ['/a1.png', 'one action'],
	'(aa)': ['/a2.png', 'two actions'],
	'(aaa)': ['/a3.png', 'three actions'],
}

const Paragraph = styled.div`
	padding-bottom: 1%;
`

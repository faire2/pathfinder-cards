import snarkdown from 'snarkdown'
import { czechKeywords, czechNumericKeywords, keywords, numericKeywords } from '@/data/keyWords'
import { Hr, Paragraph } from '@/styles/commonStyledComponents'
import { actionIcons, createActionIcon } from './createActionIcon'

// Precombine all keywords
const allKeywords = [...keywords, ...czechKeywords]
const allNumericKeywords = [...numericKeywords, ...czechNumericKeywords]

// Regex patterns - negative lookbehind/lookahead to skip words already in bold
const actionIconPattern = /(\(a{1,3}\)|\(r\)|\(na\))/g
const keywordPattern = new RegExp(`(?<!\\*\\*)\\b(${allKeywords.join('|')})\\b(?!\\*\\*)`, 'gi')

export default function renderEnrichedText(text: string | undefined, cardWidth?: number) {
	if (!text) return <></>

	const emphasizeKeywords = (line: string): string => {
		// Bold keywords (skips those already wrapped in **)
		let result = line.replace(keywordPattern, '**$1**')

		// Handle numeric keywords (only bold when followed by number or L)
		allNumericKeywords.forEach(keyword => {
			const numericPattern = new RegExp(`(?<!\\*\\*)\\b(${keyword})\\b(?!\\*\\*)(?=\\s+(?:\\d+|L))`, 'gi')
			result = result.replace(numericPattern, '**$1**')
		})

		return result
	}

	const renderLine = (line: string, lineIndex: number) => {
		if (line === '-') {
			return <Hr key={lineIndex} />
		}

		// Apply keyword emphasis
		const emphasizedLine = emphasizeKeywords(line)

		// Split by action icons, keeping delimiters
		const parts = emphasizedLine.split(actionIconPattern)

		const elements = parts.map((part, partIndex) => {
			// Check if this part is an action icon
			if (Object.keys(actionIcons).includes(part)) {
				return createActionIcon(part, 10, partIndex)
			}

			// Process text with snarkdown
			if (!part.trim()) return null

			const html = snarkdown(part)
			return (
				<span
					key={partIndex}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)
		})

		return <Paragraph key={lineIndex}>{elements}</Paragraph>
	}

	const lines = text.split('\n')
	return <>{lines.map(renderLine)}</>
}
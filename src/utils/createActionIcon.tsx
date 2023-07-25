import { ReactElement } from 'react'
import Image from 'next/image'


export const actionIcons: Record<string, string[]> = {
	'(a)': ['/a1.png', 'one action'],
	'(aa)': ['/a2.png', 'two actions'],
	'(aaa)': ['/a3.png', 'three actions'],
}

export const createActionIcon = (
	word: string,
	cardWidth: number = 63.5,
	index?: number,
): ReactElement | undefined => {
	const actionIconData = actionIcons[word]

	if (!actionIconData) {
		return undefined
	}

	const actionIcon = index ? (
		<span key={index}>
			<Image
				src={actionIconData[0]}
				width={cardWidth / 6}
				height={cardWidth / 6}
				alt={actionIconData[2]}
			/>{' '}
		</span>
	) : (
		<Image
			src={actionIconData[0]}
			width={15}
			height={15}
			alt={actionIconData[2]}
			key={index}
		/>
	)

	return actionIcon
}

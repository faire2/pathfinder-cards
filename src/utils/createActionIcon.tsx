import { ReactElement } from 'react'
import { ActionIcon } from '@/components/Card/styles'


export const actionIcons: Record<string, string[]> = {
	'(a)': ['/a1.png', 'one action'],
	'(aa)': ['/a2.png', 'two actions'],
	'(aaa)': ['/a3.png', 'three actions'],
	'(r)': ['/reaction.png', 'variable actions'],
	'(na)': ['/no_action.png', 'noaction'],

}

export const createActionIcon = (
	word: string,
	height: number,
	index?: number,
): ReactElement | undefined => {
	const actionIconData = actionIcons[word]

	if (!actionIconData) {
		return undefined
	}

	const actionIcon =
		<ActionIcon
			src={actionIconData[0]}
			alt={actionIconData[2]}
			height={height}
			key={index}
		/>

	return actionIcon
}

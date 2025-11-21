'use client'

import { use } from 'react'
import Card from '@/components/Card'
import { PrimaryLink } from '@/styles/commonStyledComponents'
import { useCurrentProject } from '@/hooks/useProject'
import { Pages } from '@/enums/pages'

import * as S from './styles'


interface Props {
	params: Promise<{
		cardIndex: number
	}>
}


export default function SingleCardView({ params }: Props) {
	const { cardIndex } = use(params)
	const { data: currentProject } = useCurrentProject()
	const cards = currentProject?.cards || []
	const numericCardIndex = Number(cardIndex)

	return (
		<div>
			<Card cardData={cards[numericCardIndex]} />
			<S.CardControls>
				<PrimaryLink href={`${Pages.singlePage}${numericCardIndex - 1}`}>
					&larr;
				</PrimaryLink>
				<PrimaryLink href={`${Pages.singlePage}${numericCardIndex + 1}`}>
					&rarr;
				</PrimaryLink>
			</S.CardControls>
		</div>
	)
}

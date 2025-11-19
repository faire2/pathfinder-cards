'use client'

import { use } from 'react'
import Card from '@/components/Card'
import { PrimaryLink } from '@/styles/commonStyledComponents'
import { useCurrentProject } from '@/stores/projectStoreV2'
import { Pages } from '@/enums/pages'

import * as S from './styles'


interface Props {
	params: Promise<{
		cardIndex: number
	}>
}


export default function CardEdiSingleCardViewtView({ params }: Props) {
	const { cardIndex } = use(params)
	const currentProject = useCurrentProject()
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

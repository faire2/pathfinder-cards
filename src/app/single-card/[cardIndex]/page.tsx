'use client'

import Card from '@/components/Card'
import { PrimaryLink } from '@/styles/commonStyledComponents'
import { useCards } from '@/stores/projectStore'
import { Pages } from '@/enums/pages'

import * as S from './styles'


interface Props {
	params: {
		cardIndex: number
	}
}


export default function CardEdiSingleCardViewtView({ params }: Props) {
	const cards = useCards()
	const numericCardIndex = Number(params.cardIndex)

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

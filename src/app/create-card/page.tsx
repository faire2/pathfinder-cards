'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import CardEditFields from '@/components/CardEdit/CardEditFields'
import { PageColumn, PrimaryButton } from '@/styles/commonStyledComponents'
import { emptyCard } from '@/data/emptyCard'
import { useProjectActions } from '@/stores/projectStore'

import * as S from './styles'


export default function CreateCard() {
	const [cardData, setCardData] = useState<CardData>(emptyCard)
	const { addCard } = useProjectActions()

	return (
		<S.CreateCardView>
			<PageColumn>
				<CardEditFields cardData={cardData} onSaveCardData={setCardData} />
			</PageColumn>
			<PageColumn>
				<Card cardData={cardData} />
				<PrimaryButton onClick={() => addCard(cardData)}>
					Save card
				</PrimaryButton>
			</PageColumn>
		</S.CreateCardView>
	)
}

import { useState } from 'react'
import CardEdit from '@/components/CardEdit'
import Card from '@/components/Card'
import { emptyCard } from '@/data/emptyCard'
import { ViewColumn, PrimaryButton } from '@/styles/commonStyledComponents'

import * as S from './styles'


interface Props {
	onSaveCard: (card: CardData) => void
}

export default function CreateCardView({ onSaveCard }: Props) {
	const [cardData, setCardData] = useState<CardData>(emptyCard)

	return (
		<S.CreateCardView>
			<ViewColumn>
				<CardEdit cardData={cardData} onSaveCardData={setCardData} />
			</ViewColumn>
			<ViewColumn>
				<Card cardData={cardData} />
				<PrimaryButton onClick={() => onSaveCard(cardData)}>
					Save card
				</PrimaryButton>
			</ViewColumn>
		</S.CreateCardView>
	)
}

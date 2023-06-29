import { useState } from 'react'
import CardEdit from '@/components/CardEdit'
import { emptyCard } from '@/data/emptyCard'

import * as S from './styles'
import SingleCardView from '../SingleCardView'
import Card from '@/components/Card'


interface Props {
	onSaveCard: (card: CardData) => void
}

export default function CreateCardView({ onSaveCard }: Props) {
	const [cardData, setCardData] = useState<CardData>(emptyCard)

	return (
		<S.CreateCardView>
			<CardEdit cardData={cardData} onSaveCardData={setCardData} />
			<Card cardData={cardData} />
		</S.CreateCardView>
	)
}

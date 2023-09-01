'use client'

import CardEdit from '@/components/CardEdit/CardEdit'
import { emptyCard } from '@/data/emptyCard'
import { useCards } from '@/stores/projectStore'

interface Props {
	params: {
		cardIndex: number
	}
}


// export default function EditCard({ cardIndex }: Props) {
export default function EditCard({ params }: Props) {
	const cards = useCards()
	const numericCardIndex = Number(params.cardIndex) ?? undefined
	const card = cards[numericCardIndex]

	return (
		<>
			{card && (
				<CardEdit
					initialCard={card}
					cardIndex={card === emptyCard ? null : numericCardIndex}
				/>
			)}
		</>
	)
}

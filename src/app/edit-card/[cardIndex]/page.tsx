'use client'

import { use } from 'react'
import CardEdit from '@/components/CardEdit/CardEdit'
import { emptyCard } from '@/data/emptyCard'
import { useCurrentProject } from '@/stores/projectStoreV2'

interface Props {
	params: Promise<{
		cardIndex: number
	}>
}


// export default function EditCard({ cardIndex }: Props) {
export default function EditCard({ params }: Props) {
	const { cardIndex } = use(params)
	const currentProject = useCurrentProject()
	const cards = currentProject?.cards || []
	const numericCardIndex = Number(cardIndex) ?? undefined
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

'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import CardEditFields from '@/components/CardEdit/CardEditFields'
import { PageColumn, PrimaryButton } from '@/styles/commonStyledComponents'
import { emptyCard } from '@/data/emptyCard'
import { useProjectActionsV2, useCurrentProject, useProjectLoading, useProjectError } from '@/stores/projectStoreV2'

import * as S from './styles'

export default function CreateCard() {
	const [cardData, setCardData] = useState<CardData>(emptyCard)
	const { createCard, addCardToProject } = useProjectActionsV2()
	const currentProject = useCurrentProject()
	const isLoading = useProjectLoading()
	const error = useProjectError()

	const handleAddCard = async () => {
		if (!currentProject) {
			alert('Please create a project first')
			return
		}

		// Validate required fields
		if (!cardData.name) {
			alert('Please give your card a name')
			return
		}

		try {
			// Step 1: Create card in library (returns the created card with ID)
			const newCard = await createCard(cardData)

			// Step 2: Add the card to the current project
			await addCardToProject(currentProject.id, newCard.id)

			// Reset form
			setCardData(emptyCard)
		} catch (err) {
			console.error('Failed to create card:', err)
			alert('Failed to create card. Please try again.')
		}
	}

	return (
		<S.CreateCardView>
			<PageColumn>
				<CardEditFields cardData={cardData} onSaveCardData={setCardData} />
			</PageColumn>
			<PageColumn>
				<Card cardData={cardData} />
				<PrimaryButton onClick={handleAddCard}>Add a new card</PrimaryButton>
			</PageColumn>
		</S.CreateCardView>
	)
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import CardEditFields from '@/components/CardEdit/CardEditFields'
import { PageColumn, PrimaryButton } from '@/styles/commonStyledComponents'
import { emptyCard } from '@/data/emptyCard'
import { useAddCardToProject, useCurrentProject } from '@/hooks/useProject';
import { Pages } from '@/enums/pages'

import * as S from './styles'
import { useCreateCard } from '@/hooks/useCards';


export default function CreateCard() {
	const router = useRouter()
	const [cardData, setCardData] = useState<CardData>(emptyCard)
	const { data: currentProject } = useCurrentProject()
	const createCardMutation = useCreateCard()
	const addCardToProjectMutation = useAddCardToProject()

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


		// Step 1: Create card in library (returns the created card with ID)
		createCardMutation.mutate(cardData, {
			onSuccess: ({ id }) => {
				// Step 2: Add the card to the current project
				addCardToProjectMutation.mutate({ cardId: id, projectId: currentProject.id }, {
					onSuccess: () => {
						// Reset form and redirect to project page
						setCardData(emptyCard)
						router.push(Pages.home)
					}
				})
			}
		})
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

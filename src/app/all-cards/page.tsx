'use client'

import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'

import Card from '@/components/Card'
import { PrimaryButton } from '@/styles/commonStyledComponents'

import * as S from './styles'
import { useAddCardToProject, useAllProjects, useCurrentProject, useRemoveCardFromProject } from '@/hooks/useProject';
import { useCardLibrary, useDeleteCard } from '@/hooks/useCards'


export default function AllCards() {
	const { data: currentProject } = useCurrentProject()

	const isCardInCurrentProject = (cardId: string) => {
		if (!currentProject) return false
		return currentProject.cards.some((card) => card.id === cardId)
	}

	const addCardMutation = useAddCardToProject();
	const handleAddToProject = async (cardId: string) => {
		if (!currentProject) {
			alert('Please select a project first')
			return
		}
		addCardMutation.mutate({ cardId, projectId: currentProject.id })
	}

	const removeCardMutation = useRemoveCardFromProject()
	const handleRemoveFromProject = async (cardId: string) => {
		if (!currentProject) return
		removeCardMutation.mutate({ cardId, projectId: currentProject.id })
	}

	const deleteCardMutation = useDeleteCard()
	const handleDeleteCard = async (cardId: string, cardName: string) => {
		const confirmed = confirm(
			`Are you sure you want to permanently delete "${cardName}"? This will remove it from all projects and cannot be undone.`
		)
		if (!confirmed) return
		deleteCardMutation.mutate(cardId)
	}

	const { data: cardLibrary } = useCardLibrary()

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PageContainer>
				<S.PageTitle>All Cards ({cardLibrary?.length || 0})</S.PageTitle>
				{ cardLibrary?.length ? (
					<S.CardGrid>
						{cardLibrary.map((card) => {
							const inCurrentProject = isCardInCurrentProject(card.id)
							return (
								<S.CardItem key={card.id}>
									<Card cardData={card} />
									<S.CardActions>
										{inCurrentProject ? (
											<PrimaryButton onClick={() => handleRemoveFromProject(card.id)}>
												Remove
											</PrimaryButton>
										) : (
											<PrimaryButton onClick={() => handleAddToProject(card.id)}>
												Add to project
											</PrimaryButton>
										)}
										<PrimaryButton onClick={() => handleDeleteCard(card.id, card.name)}>
											Delete card
										</PrimaryButton>
									</S.CardActions>
								</S.CardItem>
							)
						})}
					</S.CardGrid>
				) : (
					<S.EmptyMessage>
						No cards in your library yet. Create your first card!
					</S.EmptyMessage>
				)}
			</S.PageContainer>
		</CardDimensionsCtx.Provider>
	)
}
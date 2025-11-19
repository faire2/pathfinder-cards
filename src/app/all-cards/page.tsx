'use client'

import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { useCardLibrary, useCurrentProject, useProjectActionsV2 } from '@/stores/projectStoreV2'
import Card from '@/components/Card'
import { PrimaryButton } from '@/styles/commonStyledComponents'

import * as S from './styles'


export default function AllCards() {
	const cardLibrary = useCardLibrary()
	const currentProject = useCurrentProject()
	const { addCardToProject, removeCardFromProject, deleteCard } = useProjectActionsV2()

	const isCardInCurrentProject = (cardId: string) => {
		if (!currentProject) return false
		return currentProject.cards.some((card) => card.id === cardId)
	}

	const handleAddToProject = async (cardId: string) => {
		if (!currentProject) {
			alert('Please select a project first')
			return
		}
		try {
			await addCardToProject(currentProject.id, cardId)
		} catch (error) {
			console.error('Failed to add card to project:', error)
			alert('Failed to add card to project')
		}
	}

	const handleRemoveFromProject = async (cardId: string) => {
		if (!currentProject) return
		try {
			await removeCardFromProject(currentProject.id, cardId)
		} catch (error) {
			console.error('Failed to remove card from project:', error)
			alert('Failed to remove card from project')
		}
	}

	const handleDeleteCard = async (cardId: string, cardName: string) => {
		const confirmed = confirm(
			`Are you sure you want to permanently delete "${cardName}"? This will remove it from all projects and cannot be undone.`
		)
		if (!confirmed) return

		try {
			await deleteCard(cardId)
		} catch (error) {
			console.error('Failed to delete card:', error)
			alert('Failed to delete card')
		}
	}

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PageContainer>
				<S.PageTitle>All Cards ({cardLibrary.length})</S.PageTitle>
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
				{cardLibrary.length === 0 && (
					<S.EmptyMessage>
						No cards in your library yet. Create your first card!
					</S.EmptyMessage>
				)}
			</S.PageContainer>
		</CardDimensionsCtx.Provider>
	)
}
'use client'

import { useState } from 'react'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'

import Card from '@/components/Card'
import SpinnerButton from '@/components/SpinnerButton'

import * as S from './styles'
import { useAddCardToProject, useCurrentProject, useRemoveCardFromProject } from '@/hooks/useProject';
import { useCardLibrary, useDeleteCard } from '@/hooks/useCards'


export default function AllCards() {
	const { data: currentProject } = useCurrentProject()
	const [loadingCardId, setLoadingCardId] = useState<string | null>(null)
	const [loadingAction, setLoadingAction] = useState<'add' | 'remove' | 'delete' | null>(null)

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
		setLoadingCardId(cardId)
		setLoadingAction('add')
		addCardMutation.mutate({ cardId, projectId: currentProject.id }, {
			onSettled: () => {
				setLoadingCardId(null)
				setLoadingAction(null)
			}
		})
	}

	const removeCardMutation = useRemoveCardFromProject()
	const handleRemoveFromProject = async (cardId: string) => {
		if (!currentProject) return
		setLoadingCardId(cardId)
		setLoadingAction('remove')
		removeCardMutation.mutate({ cardId, projectId: currentProject.id }, {
			onSettled: () => {
				setLoadingCardId(null)
				setLoadingAction(null)
			}
		})
	}

	const deleteCardMutation = useDeleteCard()
	const handleDeleteCard = async (cardId: string, cardName: string) => {
		const confirmed = confirm(
			`Are you sure you want to permanently delete "${cardName}"? This will remove it from all projects and cannot be undone.`
		)
		if (!confirmed) return
		setLoadingCardId(cardId)
		setLoadingAction('delete')
		deleteCardMutation.mutate(cardId, {
			onSettled: () => {
				setLoadingCardId(null)
				setLoadingAction(null)
			}
		})
	}

	const { data: cardLibrary } = useCardLibrary()

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PageContainer>
				{ cardLibrary?.length ? (
					<S.CardGrid>
						{cardLibrary.map((card) => {
							const inCurrentProject = isCardInCurrentProject(card.id)
							return (
								<S.CardItem key={card.id}>
									<S.CardWrapper>
										<Card cardData={card} />
									</S.CardWrapper>
									<S.CardActions>
										{inCurrentProject ? (
											<SpinnerButton
												onClick={() => handleRemoveFromProject(card.id)}
												isLoading={loadingCardId === card.id && loadingAction === 'remove'}
												disabled={loadingCardId !== null}
											>
												Remove
											</SpinnerButton>
										) : (
											<SpinnerButton
												onClick={() => handleAddToProject(card.id)}
												isLoading={loadingCardId === card.id && loadingAction === 'add'}
												disabled={loadingCardId !== null}
											>
												Add to project
											</SpinnerButton>
										)}
										<SpinnerButton
											onClick={() => handleDeleteCard(card.id, card.name)}
											isLoading={loadingCardId === card.id && loadingAction === 'delete'}
											disabled={loadingCardId !== null}
										>
											Delete card
										</SpinnerButton>
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
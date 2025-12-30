'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	PageColumn,
	Label,
} from '@/styles/commonStyledComponents'
import SpinnerButton from '../SpinnerButton'
import { emptyCard } from '@/data/emptyCard'
import { isCardData } from '@/utils/cardUtils'
import { Pages } from '@/enums/pages'

import * as S from './styles'
import Card from '../Card'
import CardEditFields from './CardEditFields'
import { useAddCardToProject, useCurrentProject, useRemoveCardFromProject } from '@/hooks/useProject'
import { useCreateCard, useUpdateCard } from '@/hooks/useCards'


interface Props {
	initialCard: CardData
	cardIndex: number | null
}


export default function CardEdit({ initialCard, cardIndex }: Props) {
	const router = useRouter()
	const [cardData, setCardData] = useState<CardData>(initialCard)
	const [isSaving, setIsSaving] = useState(false)
	const [isRemoving, setIsRemoving] = useState(false)
	const { data: currentProject } = useCurrentProject()
	const updateCardMutation = useUpdateCard()
	const createCardMutation = useCreateCard()
	const addCardToProjectMutation = useAddCardToProject()
	const removeCardFromProjectMutation = useRemoveCardFromProject()

	const jsonValue = JSON.stringify(cardData)
	const transformData = (stringifiedNewCard: string) => {
		let transformedCard
		try {
			transformedCard = JSON.parse(stringifiedNewCard)
		} catch (error) {
			console.debug(error)
		}

		if (isCardData(transformedCard)) {
			setCardData(transformedCard)
		}
	}

	const handleOnSaveClick = () => {
		if (!cardData || !currentProject) return

		setIsSaving(true)
		if (cardData.id) {
			// Editing existing card - update it and redirect to home
			updateCardMutation.mutate(cardData, {
				onSuccess: () => {
					router.push(Pages.home)
				},
				onSettled: () => {
					setIsSaving(false)
				}
			})
		} else {
			// Creating new card - create and add to project
			createCardMutation.mutate(cardData, {
				onSuccess: ({ id }) => {
					addCardToProjectMutation.mutate({
						cardId: id,
						projectId: currentProject.id
					}, {
						onSuccess: () => {
							// Reset form and redirect after creating new card
							setCardData(emptyCard)
							router.push(Pages.home)
						},
						onSettled: () => {
							setIsSaving(false)
						}
					})
				},
				onError: () => {
					setIsSaving(false)
				}
			})
		}
	}

	const handleRemoveFromProject = () => {
		if (!currentProject || !cardData.id) return

		setIsRemoving(true)
		removeCardFromProjectMutation.mutate({
			cardId: cardData.id,
			projectId: currentProject.id
		}, {
			onSuccess: () => {
				router.push(Pages.home)
			},
			onSettled: () => {
				setIsRemoving(false)
			}
		})
	}

	return (
		<S.CardImport>
			<PageColumn>
				<Label>Paste data in correct format:</Label>
				<S.CardImportTextArea
					value={jsonValue}
					onChange={(event) => transformData(event.target.value)}
				/>
			</PageColumn>
			<PageColumn>
				<CardEditFields cardData={cardData} onSaveCardData={setCardData} />
			</PageColumn>
			<PageColumn>
				<Card cardData={cardData} />
				<SpinnerButton
					disabled={!cardData || isRemoving}
					onClick={handleOnSaveClick}
					isLoading={isSaving}
				>
					Save Card
				</SpinnerButton>
				{cardData.id && (
					<SpinnerButton
						onClick={handleRemoveFromProject}
						isLoading={isRemoving}
						disabled={isSaving}
					>
						Remove from Project
					</SpinnerButton>
				)}
			</PageColumn>
		</S.CardImport>
	)
}

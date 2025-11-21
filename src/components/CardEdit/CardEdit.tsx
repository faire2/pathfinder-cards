'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	PageColumn,
	Label,
	PrimaryButton,
} from '@/styles/commonStyledComponents'
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

		if (cardData.id) {
			// Editing existing card - update it and redirect to home
			updateCardMutation.mutate(cardData, {
				onSuccess: () => {
					router.push(Pages.home)
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
						}
					})
				}
			})
		}
	}

	const handleRemoveFromProject = () => {
		if (!currentProject || !cardData.id) return

		removeCardFromProjectMutation.mutate({
			cardId: cardData.id,
			projectId: currentProject.id
		}, {
			onSuccess: () => {
				router.push(Pages.home)
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
				<PrimaryButton disabled={!cardData} onClick={handleOnSaveClick}>
					Save Card
				</PrimaryButton>
				{cardData.id && (
					<PrimaryButton onClick={handleRemoveFromProject}>
						Remove from Project
					</PrimaryButton>
				)}
			</PageColumn>
		</S.CardImport>
	)
}

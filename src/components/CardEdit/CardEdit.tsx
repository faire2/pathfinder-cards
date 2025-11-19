'use client'

import { useState } from 'react'
import {
	PageColumn,
	Label,
	PrimaryButton,
} from '@/styles/commonStyledComponents'
import { emptyCard } from '@/data/emptyCard'
import { useProjectActionsV2, useCurrentProject } from '@/stores/projectStoreV2'
import { isCardData } from '@/utils/cardUtils'

import * as S from './styles'
import Card from '../Card'
import CardEditFields from './CardEditFields'


interface Props {
	initialCard: CardData
	cardIndex: number | null
}


export default function CardEdit({ initialCard, cardIndex }: Props) {
	const [cardData, setCardData] = useState<CardData>(initialCard)
	const { updateCard, createCard, addCardToProject, removeCardFromProject } = useProjectActionsV2()
	const currentProject = useCurrentProject()

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

	const handleOnSaveClick = async () => {
		if (!cardData || !currentProject) return

		try {
			if (cardData.id) {
				// Editing existing card - update it
				await updateCard(cardData.id, cardData)
				// Don't reset when editing - keep the current card data
			} else {
				// Creating new card - create and add to project
				const newCard = await createCard(cardData)
				await addCardToProject(currentProject.id, newCard.id)
				// Reset form after creating new card
				setCardData(emptyCard)
			}
		} catch (error) {
			console.error('Failed to save card:', error)
		}
	}

	const handleRemoveFromProject = async () => {
		if (!currentProject || !cardData.id) return

		try {
			await removeCardFromProject(currentProject.id, cardData.id)
		} catch (error) {
			console.error('Failed to remove card from project:', error)
		}
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

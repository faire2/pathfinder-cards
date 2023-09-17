'use client'

import { useState } from 'react'
import {
	PageColumn,
	Label,
	PrimaryButton,
} from '@/styles/commonStyledComponents'
import { emptyCard } from '@/data/emptyCard'
import { useProjectActions } from '@/stores/projectStore'
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
	const { addCard, saveCardByIndex, removeCardByIndex } = useProjectActions()

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
		if (cardData) {
			if (cardIndex) {
				saveCardByIndex(cardData, cardIndex)
			} else {
				addCard(cardData)
			}
			setCardData(emptyCard)
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
				{typeof cardIndex === 'number' && (
					<PrimaryButton onClick={() => removeCardByIndex(cardIndex)}>
						Remove Card
					</PrimaryButton>
				)}
			</PageColumn>
		</S.CardImport>
	)
}

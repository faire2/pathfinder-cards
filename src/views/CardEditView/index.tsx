import { useState } from 'react'

import { emptyCard } from '@/data/emptyCard'
import { Label, PrimaryButton, ViewColumn } from '@/styles/commonStyledComponents'

import * as S from './styles'
import CardEdit from '../../components/CardEdit'
import Card from '../../components/Card'


interface Props {
	card: CardData | null
	cardIndex: number | null
	onSaveCard: (cardData: CardData, cardIndex: number | null) => void
	onCardRemoval: (cardIndex?: number) => void
}

export default function CardEditView({
	card,
	cardIndex,
	onSaveCard,
	onCardRemoval,
}: Props) {
	const [cardData, setCardData] = useState<CardData>(
		card ? card :emptyCard
	)

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
			onSaveCard(cardData, typeof cardIndex === 'number' ? cardIndex : null)
			setCardData(emptyCard)
		}
	}

	return (
		<S.CardImport>
			<ViewColumn>
				<Label>Paste data in correct format:</Label>
				<S.CardImportTextArea
					value={jsonValue}
					onChange={(event) => transformData(event.target.value)}
				/>
			</ViewColumn>
			<ViewColumn>
				<CardEdit cardData={cardData} onSaveCardData={setCardData} />
			</ViewColumn>
			<ViewColumn>
				<Card cardData={cardData} />
				<PrimaryButton
					disabled={!cardData}
					onClick={handleOnSaveClick}
				>
					Save Card
				</PrimaryButton>
				{typeof cardIndex === 'number' &&
					<PrimaryButton onClick={() => onCardRemoval(cardIndex)}>
						Remove Card
					</PrimaryButton>
				}
			</ViewColumn>
		</S.CardImport>
	)
}

const isCardData = (value: Object): value is CardData => (
	value &&
	value.hasOwnProperty('id') &&
	value.hasOwnProperty('name') &&
	value.hasOwnProperty('type') &&
	value.hasOwnProperty('level') &&
	value.hasOwnProperty('traits') &&
	value.hasOwnProperty('actions') &&
	value.hasOwnProperty('body')
)

import { useState } from 'react'

import { emptyCard } from '@/data/emptyCard'
import { PrimaryButton } from '@/styles/commonComponentStyles'

import * as S from './styles'
import CardEdit from '../../components/CardEdit'
import { Label } from '../../components/Input/styles'
import Card from '../../components/Card'


interface Props {
	onCardImport: (newCard: CardData) => void
}

export default function CardImportView({ onCardImport }: Props) {
	const [newCardData, setNewCardData] = useState<CardData>(emptyCard)

	const jsonValue = JSON.stringify(newCardData)
	const transformData = (stringifiedNewCard: string) => {
		let transformedCard
		try {
			transformedCard = JSON.parse(stringifiedNewCard)
		} catch (error) {
			console.debug(error)
		}

		if (isCardData(transformedCard)) {
			setNewCardData(transformedCard)
		}
	}

	const handleOnImportClick = () => {
		if (newCardData) {
			onCardImport(newCardData)
			setNewCardData(emptyCard)
		}
	}

	return (
		<S.CardImport>
			<S.ImportColumn>
				<Label>Paste data in correct format:</Label>
				<S.CardImportTextArea
					value={jsonValue}
					onChange={(event) => transformData(event.target.value)}
				/>
			</S.ImportColumn>
			<S.ImportColumn>
				<CardEdit cardData={newCardData} onCreateNewCard={setNewCardData} />
			</S.ImportColumn>
			<S.ImportColumn>
				<Card cardData={newCardData} />
				<PrimaryButton disabled={!newCardData} onClick={handleOnImportClick}>
					Import Card
				</PrimaryButton>
			</S.ImportColumn>
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

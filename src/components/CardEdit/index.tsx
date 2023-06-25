import { ChangeEvent } from 'react'
import * as S from './styles'
import Input from '../Input'


interface Props {
	cardData: CardData | undefined
	onSaveCard: (cardData: CardData) => void
}

export default function CardEdit({ cardData, onSaveCard }: Props) {
	const handleNameChange = (value: string) => {
		cardData && onSaveCard({ ...cardData, name: value })
	}

	const handleTraitsChange = (value: string) => {
		cardData && onSaveCard({ ...cardData, traits: value })
	}

	const handleActionsChange = (value: string) => {
		cardData && onSaveCard({ ...cardData, actions: value })
	}

	const handleTypeChange = (value: string) => {
		cardData && onSaveCard({ ...cardData, type: value })
	}

	const handleLevelChange = (value: string) => {
		cardData && onSaveCard({ ...cardData, level: value })
	}

	const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		cardData && onSaveCard({ ...cardData, body: event.target.value })
	}

	return (
		<S.CardEdit>
			<Input
				label="Name:"
				value={cardData?.name ?? ''}
				onChange={handleNameChange}
			/>
			<Input
				label="Traits:"
				value={cardData?.traits ?? ''}
				onChange={handleTraitsChange}
			/>
			<Input
				label="Actions:"
				value={cardData?.actions ?? ''}
				onChange={handleActionsChange}
			/>
			<Input
				label="Type:"
				value={cardData?.type ?? ''}
				onChange={handleTypeChange}
			/>
			<Input
				label="Level:"
				value={cardData?.level.toString() ?? ''}
				onChange={handleLevelChange}
			/>
			<S.TextArea value={cardData?.body ?? ''} onChange={handleBodyChange} />
		</S.CardEdit>
	)
}

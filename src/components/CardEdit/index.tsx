import { ChangeEvent, useContext, useState } from 'react'
import { CardDimensionsCtx } from '../Card/cardContexts'
import * as S from './styles'
import Input from '../Input'

interface Props {
	cardData: CardData
}

export default function CardEdit({ cardData }: Props) {
	const { width } = useContext(CardDimensionsCtx)
	const [editData, setEditData] = useState<CardData>(cardData)

	const handleNameChange = (value: string) => {
		setEditData({ ...editData, name: value })
	}

	const handleTraitsChange = (value: string) => {
		setEditData({ ...editData, traits: value })
	}

	const handleActionsChange = (value: string) => {
		setEditData({ ...editData, actions: value })
	}

	const handleTypeChange = (value: string) => {
		setEditData({ ...editData, type: value })
	}

	const handleLevelChange = (value: string) => {
		setEditData({ ...editData, level: value })
	}

	const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setEditData({ ...editData, body: event.target.value })
	}

	return (
		<S.CardEdit width={width}>
			<Input label="Name:" value={editData.name} onChange={handleNameChange} />
			<Input label="Traits:" value={editData.traits} onChange={handleTraitsChange} />
			<Input label="Actions:" value={editData.actions} onChange={handleActionsChange} />
			<Input label="Type:" value={editData.type} onChange={handleTypeChange} />
			<Input label="Level:" value={editData.level.toString()} onChange={handleLevelChange} />
			<S.TextArea value={editData.body} onChange={handleBodyChange} />
		</S.CardEdit>
	)
}

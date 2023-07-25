import CreateCardView from '../CreateCardView'
import CardEditView from '../CardEditView'
import ProjectView from '../ProjectView'

interface Props {
	project: Project
	view: View
	cardData: CardData | null
	cardIndex: number | null

	onSaveCard: (card: CardData) => void
	onCardRemoval: (removeIndex?: number) => void
	onChangeViewToCardEdit: (cardIndex: number) => void
}

export default function View({
	project,
	view,
	cardData,
	cardIndex,
	onSaveCard: onAddCard,
	onCardRemoval,
	onChangeViewToCardEdit,
}: Props) {
	return (
		<>
			{view === 'createCard' && <CreateCardView onSaveCard={onAddCard} />}
			{view === 'editCard' && <CardEditView
				card={cardData}
				cardIndex={cardIndex}
				onSaveCard={onAddCard}
				onCardRemoval={onCardRemoval}
			/>}
			{view === 'projectView' && <ProjectView
				project={project}
				onCardClick={onChangeViewToCardEdit}
			/>}
		</>
	)
}

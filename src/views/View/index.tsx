import CreateCardView from '../CreateCardView'
import CardImportView from '../ImportCardView'

interface Props {
	view: View

	onAddCard: (card: CardData) => void
}

export default function View({ view, onAddCard }: Props) {
	return (
		<>
			{view === 'createCard' && <CreateCardView onSaveCard={onAddCard} />}
			{view === 'importCard' && <CardImportView onCardImport={onAddCard} />}
		</>
	)
}

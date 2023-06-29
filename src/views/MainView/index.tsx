import CreateCardView from '../CreateCardView'
import CardImportView from '../ImportCardView'
import ProjectView from '../ProjectView'

interface Props {
	project: Project
	view: View

	onAddCard: (card: CardData) => void
}

export default function View({ project, view, onAddCard }: Props) {
	return (
		<>
			{view === 'createCard' && <CreateCardView onSaveCard={onAddCard} />}
			{view === 'importCard' && <CardImportView onCardImport={onAddCard} />}
			{view === 'projectView' && <ProjectView project={project} />}
		</>
	)
}

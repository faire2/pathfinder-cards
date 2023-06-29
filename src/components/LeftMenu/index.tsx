import { PrimaryButton } from '@/styles/commonStyledComponents'
import * as S from './styles'


interface Props {
	hasCards: boolean
	projectNameExists: boolean

	handleCardRemoval: () => void
	loadProject: () => void
	saveProject: () => void
	setView: (view: View) => void
}

export default function LeftMenu({
	hasCards,
	projectNameExists,

	handleCardRemoval,
	loadProject,
	saveProject,
	setView,
}: Props) {

	return (
		<S.LeftMenu>
			<PrimaryButton
				disabled={!projectNameExists}
				onClick={() => setView('createCard')}
			>
				Create a new card
			</PrimaryButton>

			<PrimaryButton
				disabled={!projectNameExists}
				onClick={() => setView('importCard')}
			>
				Import a new card
			</PrimaryButton>

			<PrimaryButton
				disabled={!projectNameExists || !hasCards}
				onClick={handleCardRemoval}
			>
				Remove current card
			</PrimaryButton>

			<PrimaryButton disabled={!projectNameExists} onClick={saveProject}>
				Save project
			</PrimaryButton>

			<PrimaryButton disabled={!projectNameExists} onClick={loadProject}>
				Load project
			</PrimaryButton>

			<PrimaryButton
				disabled={!projectNameExists}
				onClick={() => setView('projectView')}
			>
				Display project
			</PrimaryButton>
		</S.LeftMenu>
	)
}

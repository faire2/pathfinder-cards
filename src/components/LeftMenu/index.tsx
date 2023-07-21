import { PrimaryButton } from '@/styles/commonStyledComponents'
import * as S from './styles'
import { getSaveProjectAsOverlay } from '../InputOverlay/overlays'


interface Props {
	hasCards: boolean
	projectNameExists: boolean

	handleCardRemoval: () => void
	loadProject: () => void
	saveProject: () => void
	saveProjectAs: InputFunction
	setOverlay: (overlay: OverlayData) => void
	setView: (view: View) => void
}


export default function LeftMenu({
	hasCards,
	projectNameExists,

	handleCardRemoval,
	loadProject,
	saveProject,
	saveProjectAs,
	setOverlay,
	setView,
}: Props) {
	const overlay = getSaveProjectAsOverlay(saveProjectAs)

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

			<PrimaryButton
				disabled={!projectNameExists}
				onClick={() => setOverlay(getSaveProjectAsOverlay(saveProjectAs))}
			>
				Save project as
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

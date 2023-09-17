import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useProjectActions, useProjectName } from '@/stores/projectStore'
import { useOverlayActions } from '@/stores/overlayStore'

import * as S from './styles'


export default function LeftMenu() {
	const projectNameExists = !!useProjectName()

	const { saveProject } = useProjectActions()
	const { showLoadProjectOverlay, showSaveProjectAsOverlay } = useOverlayActions()

	return (
		<S.LeftMenu>
			{projectNameExists && (
				<PrimaryLink href={Pages.home}>Project</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.createCard}>Create a new card</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.importCard}>Import a new card</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryLink href={Pages.printView}>Print view</PrimaryLink>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={saveProject}>Save project</PrimaryButton>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={() => showSaveProjectAsOverlay()}>
					Save project as
				</PrimaryButton>
			)}

			{projectNameExists && (
				<PrimaryButton onClick={() => showLoadProjectOverlay()}>
					Load project
				</PrimaryButton>
			)}
		</S.LeftMenu>
	)
}

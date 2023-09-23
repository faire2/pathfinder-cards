import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useProjectActions, useProjectName } from '@/stores/projectStore'
import { useOverlayActions } from '@/stores/overlayStore'


export default function LeftMenu() {
	const projectNameExists = !!useProjectName()

	const { saveProject } = useProjectActions()
	const { showLoadProjectOverlay, showSaveProjectAsOverlay } = useOverlayActions()

	return (
		<>
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
		</>
	)
}

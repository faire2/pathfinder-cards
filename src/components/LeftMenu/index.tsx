'use client'

import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useProjectActions, useProjectName } from '@/stores/projectStore'
import { useOverlayActions } from '@/stores/overlayStore'
import { useSession, signIn, signOut } from 'next-auth/react';


export default function LeftMenu() {
	const projectNameExists = !!useProjectName()

	const { saveProject } = useProjectActions()
	const { showLoadProjectOverlay, showSaveProjectAsOverlay } = useOverlayActions()

	const { data: session } = useSession();
	const isLoggedIn = !!session;

	const projectButtons = projectNameExists ?
		<>
			<PrimaryLink href={Pages.home}>Project</PrimaryLink>
			<PrimaryLink href={Pages.createCard}>Create a new card</PrimaryLink>
			<PrimaryLink href={Pages.importCard}>Import a new card</PrimaryLink>
			<PrimaryButton onClick={saveProject}>Save project</PrimaryButton>
			<PrimaryButton onClick={() => showSaveProjectAsOverlay()}>
				Save project as
			</PrimaryButton>
			<PrimaryButton onClick={() => showLoadProjectOverlay()}>
				Load project
			</PrimaryButton>
			<PrimaryLink href={Pages.printView}>Print view</PrimaryLink>
			<PrimaryButton onClick={() => signOut()}>Log out</PrimaryButton>
		</> : <></>

	return isLoggedIn ? projectButtons : <PrimaryButton onClick={() => signIn()}>Log in</PrimaryButton>
}

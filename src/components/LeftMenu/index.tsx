'use client'

import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useCurrentProject, useProjectActionsV2 } from '@/stores/projectStoreV2'
import { useOverlayActions } from '@/stores/overlayStore'
import { useSession, signIn, signOut } from 'next-auth/react';


export default function LeftMenu() {
	const currentProject = useCurrentProject()
	const projectNameExists = !!currentProject

	const { loadProjects } = useProjectActionsV2()
	const { showLoadProjectOverlay, showSaveProjectAsOverlay } = useOverlayActions()

	const { data: session } = useSession();
	const isLoggedIn = !!session;

	const projectButtons = projectNameExists ?
		<>
			<PrimaryLink href={Pages.home}>Project</PrimaryLink>
			<PrimaryLink href={Pages.createCard}>Create a new card</PrimaryLink>
			<PrimaryLink href={Pages.importCard}>Import a new card</PrimaryLink>
			<PrimaryLink href={Pages.allCards}>All cards</PrimaryLink>
			<PrimaryButton onClick={() => showLoadProjectOverlay()}>
				Switch project
			</PrimaryButton>
			<PrimaryLink href={Pages.printView}>Print view</PrimaryLink>
			<PrimaryButton onClick={() => signOut()}>Log out</PrimaryButton>
		</> : <></>

	return isLoggedIn ? projectButtons : <PrimaryButton onClick={() => signIn()}>Log in</PrimaryButton>
}

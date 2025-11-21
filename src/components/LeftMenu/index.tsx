'use client'

import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useOverlayActions } from '@/stores/overlayStore'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useCurrentProject } from '@/hooks/useProject'


export default function LeftMenu() {
	const { data: currentProject, isLoading } = useCurrentProject()
	const { showLoadProjectOverlay } = useOverlayActions()

	const { data: session } = useSession()
	const isLoggedIn = !!session

	if (isLoading) {
		return <PrimaryButton disabled>Loading...</PrimaryButton>
	}

	const projectButtons = !!currentProject ?
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

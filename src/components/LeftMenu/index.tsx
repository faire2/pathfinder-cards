'use client'

import { useState, useEffect } from 'react'
import { PrimaryButton, PrimaryLink } from '@/styles/commonStyledComponents'
import { Pages } from '@/enums/pages'
import { useOverlayActions, getLocalStorageProjectNames } from '@/stores/overlayStore'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useCurrentProject } from '@/hooks/useProject'


export default function LeftMenu() {
	const { data: currentProject, isLoading } = useCurrentProject()
	const { showSwitchProjectOverlay, showImportProjectOverlay } = useOverlayActions()
	const [hasLsProjects, setHasLsProjects] = useState(false)

	const { data: session } = useSession()
	const isLoggedIn = !!session

	useEffect(() => {
		setHasLsProjects(getLocalStorageProjectNames().length > 0)
	}, [])

	if (isLoading) {
		return <PrimaryButton disabled>Loading...</PrimaryButton>
	}

	if (!isLoggedIn) {
		return <PrimaryButton onClick={() => signIn()}>Log in</PrimaryButton>
	}

	if (!currentProject) {
		return (
			<>
				<PrimaryButton onClick={() => showSwitchProjectOverlay()}>
					Switch project
				</PrimaryButton>
				{hasLsProjects && (
					<PrimaryButton onClick={() => showImportProjectOverlay()}>
						Import project
					</PrimaryButton>
				)}
				<PrimaryButton onClick={() => signOut()}>Log out</PrimaryButton>
			</>
		)
	}

	return (
		<>
			<PrimaryLink href={Pages.createCard}>Create a new card</PrimaryLink>
			<PrimaryLink href={Pages.importCard}>Import a new card</PrimaryLink>
			<PrimaryLink href={Pages.home}>Project cards</PrimaryLink>
			<PrimaryLink href={Pages.allCards}>All cards</PrimaryLink>
			<PrimaryLink href={Pages.projects}>Projects</PrimaryLink>
			{hasLsProjects && (
				<PrimaryButton onClick={() => showImportProjectOverlay()}>
					Import project
				</PrimaryButton>
			)}
			<PrimaryLink href={Pages.printView}>Print view</PrimaryLink>
			<PrimaryButton onClick={() => signOut()}>Log out</PrimaryButton>
		</>
	)
}

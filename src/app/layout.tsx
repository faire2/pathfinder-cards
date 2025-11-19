'use client'

import StyledComponentsRegistry from '@/utils/styledComponentsRegistry'
import LeftMenu from '@/components/LeftMenu'

import * as S from './styles'
import '../styles/fonts.css'
import { useEffect, useState } from 'react'
import { useProjectActionsV2, useCurrentProject, useProjectLoading } from '@/stores/projectStoreV2'
import useProjectStoreV2 from '@/stores/projectStoreV2'
import Overlay from '@/components/Overlay'
import { useShowOverlay } from '@/stores/overlayStore'
import WelcomeScreen from '@/components/WelcomeScreen'
import { SessionProvider, useSession } from 'next-auth/react';

interface Props {
	children: React.ReactNode
}

// Inner component that has access to session
function AppContent({ children }: Props) {
	const [hasInitializedStore, setHasInitializedStore] = useState(false)
	const { data: session, status } = useSession()
	const { loadCardLibrary, loadProjects, loadProject, createProject } = useProjectActionsV2()
	const currentProject = useCurrentProject()
	const isLoading = useProjectLoading()
	const showOverlay = useShowOverlay()

	/* Load user data when authenticated
	 * NEW: Instead of localStorage, we fetch from API when user logs in
	 */
	useEffect(() => {
		const initializeStore = async () => {
			if (status === 'authenticated' && !hasInitializedStore) {
				// Load all user's cards and projects
				await loadCardLibrary()
				await loadProjects()

				// If user has projects but no current project, load the most recent one
				const { projects } = useProjectStoreV2.getState()
				if (projects.length > 0 && !currentProject) {
					// Projects are already sorted by updatedAt DESC from the API
					await loadProject(projects[0].id)
				}

				setHasInitializedStore(true)
			}
		}

		initializeStore()
	}, [status, hasInitializedStore, loadCardLibrary, loadProjects, loadProject, currentProject])

	// Handle creating a new project
	const handleCreateProject = async (projectName: string) => {
		await createProject(projectName)
	}

	return (
		<StyledComponentsRegistry>
			<S.ProjectName>{currentProject?.projectName || ''}</S.ProjectName>
			{status === 'authenticated' && !currentProject && !isLoading && (
				<WelcomeScreen onFinished={handleCreateProject} />
			)}
			{showOverlay && <Overlay />}
			<S.MenuWrapper>
				<S.LeftMenuWrapper>
					<LeftMenu />
				</S.LeftMenuWrapper>
				<S.ViewWrapper>
					<div>{children}</div>
				</S.ViewWrapper>
			</S.MenuWrapper>
		</StyledComponentsRegistry>
	)
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<AppContent>{children}</AppContent>
				</SessionProvider>
			</body>
		</html>
	)
}

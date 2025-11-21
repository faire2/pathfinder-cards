'use client'

import StyledComponentsRegistry from '@/utils/styledComponentsRegistry'
import LeftMenu from '@/components/LeftMenu'

import * as S from './styles'
import '../styles/fonts.css'
import { ReactNode, useEffect } from 'react'
import { useCurrentProjectId, useSetCurrentProjectId } from '@/stores/projectStoreV2'
import Overlay from '@/components/Overlay'
import { useShowOverlay } from '@/stores/overlayStore'
import WelcomeScreen from '@/components/WelcomeScreen'
import { SessionProvider, useSession } from 'next-auth/react';
import QueryProvider from '@/QueryProvider';
import { useAllProjects, useCreateProject, useCurrentProject } from '@/hooks/useProject';

interface Props {
	children: ReactNode
}

// Inner component that has access to session
function AppContent({ children }: Props) {
	const { status } = useSession()

	const { data: currentProject } = useCurrentProject()
	const { data: projects, isLoading: areProjectsLoading } = useAllProjects()

	const showOverlay = useShowOverlay()

	const currentProjectId = useCurrentProjectId()
	const setCurrentProjectId = useSetCurrentProjectId()

	const createProjectMutation = useCreateProject()
	const handleCreateProject = (projectName: string) => {
		createProjectMutation.mutate({ projectName }, {
			onSuccess: (newProject) => {
				setCurrentProjectId(newProject.id)
			}
		})
	}

	const hasProjects = !areProjectsLoading && projects?.length

	useEffect(() => {
		if (status === 'authenticated' && !currentProjectId && hasProjects) {
			setCurrentProjectId(projects[0].id)
		}
	}, [status, projects, currentProjectId, setCurrentProjectId, hasProjects])

	const hasNoProjects = status === 'authenticated' && !areProjectsLoading && projects?.length === 0

	return (
		<StyledComponentsRegistry>
			<S.ProjectName>{currentProject?.projectName || ''}</S.ProjectName>
			{hasNoProjects && (
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
				<QueryProvider>
					<SessionProvider>
						<AppContent>{children}</AppContent>
					</SessionProvider>
				</QueryProvider>
			</body>
		</html>
	)
}

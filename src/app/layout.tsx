'use client'

import StyledComponentsRegistry from '@/utils/styledComponentsRegistry'
import LeftMenu from '@/components/LeftMenu'

import * as S from './styles'
import '../styles/fonts.css'
import { useEffect, useState } from 'react'
import { useProjectActions, useProjectName } from '@/stores/projectStore'
import Overlay from '@/components/Overlay'
import { useShowOverlay } from '@/stores/overlayStore'
import WelcomeScreen from '@/components/WelcomeScreen'
import { SessionProvider } from 'next-auth/react';

interface Props {
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	const [hasInitializedStore, setHasInitializedStore] = useState(false)
	const { loadCurrentProject, saveProjectAs } = useProjectActions()
	const projectName = useProjectName()
	const showOverlay = useShowOverlay()

	/* Page is initially rendered on the server, where local storage is not
	accessible. Because of that we have to wait until it becomes so before
	initializing the store from the local storage.
	https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
	 */
	useEffect(() => {
		if (
			!hasInitializedStore &&
			typeof window !== 'undefined' &&
			!!loadCurrentProject
		) {
			loadCurrentProject()
			setHasInitializedStore(true)
		}
	}, [hasInitializedStore, loadCurrentProject])

	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<StyledComponentsRegistry>
						<S.ProjectName>{projectName}</S.ProjectName>
						{!projectName && <WelcomeScreen onFinished={saveProjectAs} />}
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
				</SessionProvider>
			</body>
		</html>
	)
}

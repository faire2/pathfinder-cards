'use client'

import StyledComponentsRegistry from '@/utils/styledComponentsRegistry'
import LeftMenu from '@/components/LeftMenu'

import * as S from './styles'
import '../styles/fonts.css'
import { useEffect, useState } from 'react'
import { useProjectActions } from '@/stores/projectStore'
import Overlay from '@/components/Overlay'
import { useShowOverlay } from '@/stores/overlayStore'


interface Props {
	children: React.ReactNode
}


export default function RootLayout({ children }: Props) {
	const [hasInitializedStore, setHasInitializedStore] = useState(false)
	const { loadCurrentProject } = useProjectActions()
	const showOverlay = useShowOverlay()

	/* Page is initially rendered on the server, where local storage is not
	accessible. Because of that we have to wait until it becomes so before
	initializing the store from the local storage.
	https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
	 */
	useEffect(() => {
		if (!hasInitializedStore && typeof window !== 'undefined') {
			loadCurrentProject()
			setHasInitializedStore(true)
		}
	}, [hasInitializedStore, loadCurrentProject])

	return (
		<html lang="en">
			<body>
				<StyledComponentsRegistry>
					<S.MenuWrapper>
						{!!showOverlay && <Overlay />}
						<LeftMenu />
						<div>{children}</div>
					</S.MenuWrapper>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}

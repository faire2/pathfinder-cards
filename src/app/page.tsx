'use client'

import { useState } from 'react'

import { GlobalStyle } from '@/styles/commonStyles'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import WelcomeScreen from '@/components/WelcomeScreen'
import LeftMenu from '@/components/LeftMenu'
import View from '@/views/MainView'
import Overlay from '@/components/Overlay'
import {
	loadProjectFromLs,
	loadCurrentProjectNameFromLs,
	saveCurrentProjectNameToLs,
	projectPrefix,
	saveProjectToLs,
} from '@/utils/localStorage'

import * as S from '../styles/homePageStyles'


export default function Home() {
	const [view, setView] = useState<View>('projectView')
	const [overlay, setOverlay] = useState<OverlayData | null>()
	const [projectName, setCurrentProjectName] = useState<string>(
		loadCurrentProjectNameFromLs() ?? '',
	)

	const [project, setProject] = useState<Project>(
		loadProjectFromLs(projectName) ?? {
			projectName: projectName,
			cards: [],
		},
	)
	const cards = project.cards ?? []
	const [cardIndex, setCardIndex] = useState<number>(0)

	const hideOverlay = (): void => setOverlay(null)

	const handleNewProjectName = (newProjectName: string) => {
		saveCurrentProjectNameToLs(newProjectName)
		setCurrentProjectName(newProjectName)
	}

	const saveProjectAs = ():void => {
		setOverlay({
			overlay: 'inputData',
			label: 'Save project as',
			data: '',
			hideOverlay: hideOverlay,
			onFinish: handleNewProjectName,
		})
	}

	const handleLoadProject = (): void => {
		const items = { ...localStorage }
		const projects = Object.keys(items).filter(
			(key) => key.slice(0, 17) === projectPrefix,
		)
		const projectNames = projects.map((project) => project.slice(17))

		setOverlay({
			overlay: 'listChoice',
			label: 'Load Project',
			data: projectNames,
			hideOverlay: hideOverlay,
			onFinish: loadProject,
		})
	}

	const loadProject = (projectName: string): void => {
		const loadedProject = loadProjectFromLs(projectName)
		if (projectName) {
			setProject(loadedProject as Project)
			setCurrentProjectName((loadedProject as Project).projectName)
		}
	}

	const handleAddCard = (cardData: CardData) => {
		const newCards = [...project.cards, cardData]
		setProject({ ...project, cards: newCards })
		saveProjectToLs(project)
	}

	const handleCardRemoval = (): void => {
		if (cards.length === 0) {
			return
		}

		const newCards = cards.filter((_, index) => index !== cardIndex)
		setProject({ ...project, cards: newCards })
	}

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			{!projectName && <WelcomeScreen onFinished={handleNewProjectName} />}
			{!!overlay && (
				<Overlay
					overlay={overlay.overlay}
					label={overlay.label}
					data={overlay.data}
					hideOverlay={overlay.hideOverlay}
					onFinish={overlay.onFinish}
				/>
			)}
			<S.ProjectName>{projectName}</S.ProjectName>
			<S.Home>
				<GlobalStyle />
				<LeftMenu
					hasCards={cards.length > 0}
					projectNameExists={!!projectName}
					handleCardRemoval={handleCardRemoval}
					loadProject={handleLoadProject}
					saveProject={() => saveProjectToLs(project)}
					saveProjectAs={saveProjectAs}
					setView={setView}
				/>

				<View project={project} view={view} onAddCard={handleAddCard} />
			</S.Home>
		</CardDimensionsCtx.Provider>
	)
}

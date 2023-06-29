'use client'

import { useState } from 'react'

import { GlobalStyle } from '@/styles/commonStyles'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import WelcomeScreen from '@/components/WelcomeScreen'
import LeftMenu from '@/components/LeftMenu'
import View from '@/views/MainView'
import {
	loadProject,
	loadCurrentProjectName,
	saveCurrentProjectName,
	saveProject,
} from '@/utils/localStorage'

import * as S from '../styles/homePageStyles'


export default function Home() {
	const [view, setView] = useState<View>('importCard')
	const [projectName, setCurrentProjectName] = useState<string>(
		loadCurrentProjectName() ?? '',
	)

	const [project, setProject] = useState<Project>(
		loadProject(projectName) ?? {
			projectName: projectName,
			cards: [],
		},
	)
	const cards = project.cards ?? []
	const [cardIndex, setCardIndex] = useState<number>(0)

	const handleNewProjectName = (newProjectName: string) => {
		saveCurrentProjectName(newProjectName)
		setCurrentProjectName(newProjectName)
	}

	const handleAddCard = (cardData: CardData) => {
		const newCards = [...project.cards, cardData]
		setProject({ ...project, cards: newCards })
	}

	const handleCardRemoval = () => {
		if (cards.length === 0) {
			return
		}

		const newCards = cards.filter((_, index) => index !== cardIndex)
		setProject({ ...project, cards: newCards })
	}

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			{!projectName && <WelcomeScreen onFinished={handleNewProjectName} />}
			<S.ProjectName>{projectName}</S.ProjectName>
			<S.Home>
				<GlobalStyle />
				<LeftMenu
					hasCards={cards.length > 0}
					projectNameExists={!!projectName}
					handleCardRemoval={handleCardRemoval}
					loadProject={() => loadProject(projectName)}
					saveProject={() => saveProject(project)}
					setView={setView}
				/>

				<View project={project} view={view} onAddCard={handleAddCard} />
			</S.Home>
		</CardDimensionsCtx.Provider>
	)
}

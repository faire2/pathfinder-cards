'use client'

import { useState } from 'react'
import { GlobalStyle } from '@/styles/commonStyles'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import WelcomeScreen from '@/components/WelcomeScreen'
import CardImportView from '@/components/CardImportView'
import {
	loadProject,
	loadCurrentProjectName,
	saveCurrentProjectName,
} from '@/utils/localStorage'
import * as S from '../styles/homePageStyles'

export default function Home() {
	const [view, setView] = useState<View>('cardImport')
	const [currentProjectName, setCurrentProjectName] = useState<string>(
		loadCurrentProjectName() ?? '',
	)

	const [cards, setCards] = useState<CardData[]>(
		loadProject(currentProjectName)?.cards ?? [],
	)

	const handleNewProjectName = (newProjectName: string) => {
		saveCurrentProjectName(newProjectName)
		setCurrentProjectName(newProjectName)
	}

	const handleCardImport = (cardData: CardData) => {
		setCards([...cards, cardData])
	}

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			{!currentProjectName && (
				<WelcomeScreen onFinished={handleNewProjectName} />
			)}
			<S.ProjectName>{currentProjectName}</S.ProjectName>
			<S.Home>
				<GlobalStyle />
				<S.MainButtons>
					<S.PrimaryButton onClick={() => setView('cardImport')}>
						Import a new card
					</S.PrimaryButton>
					<S.PrimaryButton>Remove current card</S.PrimaryButton>
					<S.PrimaryButton>Save project</S.PrimaryButton>
					<S.PrimaryButton>LoadProject</S.PrimaryButton>
				</S.MainButtons>

				{view === 'cardImport' && (
					<CardImportView onCardImport={handleCardImport} />
				)}
			</S.Home>
		</CardDimensionsCtx.Provider>
	)
}

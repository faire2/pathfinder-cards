import { create } from 'zustand'
import {
	loadCurrentProjectFromLs,
	loadProjectFromLs,
	saveProjectToLs,
} from '../utils/localStorage'


interface ProjectStore extends Project {
	actions: ProjectActions
}

interface ProjectActions {
	addCard: (card: CardData) => void
	getCardByIndex: (cardIndex: number) => void
	loadCurrentProject: () => void
	loadProject: (projectName: string) => void
	saveCardByIndex: (card: CardData, cardIndex: number) => void
	saveProject: () => void
	saveProjectAs: (newName: string) => void
	removeCardByIndex: (cardIndex: number) => void
}

const getInitialProject = (): Project => {
	return {
		projectName: '',
		cards: [],
	}
}

const useProjectStore = create<ProjectStore>((set, get) => ({
	...getInitialProject(),

	actions: {
		addCard: (card: CardData) =>
			set((state) => {
				const newState = {
					...state,
					cards: [...state.cards, card],
				}
				saveProjectToLs(newState.projectName, newState.cards)

				return newState
			}),

		getCardByIndex: (cardIndex: number) => get().cards?.[cardIndex],

		loadCurrentProject: () =>
			set(() => {
				const currentProject = loadCurrentProjectFromLs()
				return currentProject || getInitialProject()
			}),

		loadProject: (projectName: string) =>
			set(() => {
				const loadedProject = loadProjectFromLs(projectName)
				return loadedProject || getInitialProject()
			}),

		saveCardByIndex: (card: CardData, cardIndex: number) =>
			set((state) => {
				const newState = {
					...state,
					cards: state.cards.map((currentCard, index) =>
						cardIndex === index ? card : currentCard
					),
				}
				saveProjectToLs(newState.projectName, newState.cards)

				return newState
			}),

		saveProject: () => {
			const { projectName, cards } = get()
			saveProjectToLs(projectName, cards)
		},

		saveProjectAs: (newName: string) => {
			const { cards } = get()
			saveProjectToLs(newName, cards)
			set((state) => ({
				...state,
				projectName: newName,
			}))
		},

		removeCardByIndex: (cardIndex: number) =>
			set((state) => {
				const newState = {
					...state,
					cards: [
						...state.cards.slice(0, cardIndex),
						...state.cards.slice(cardIndex + 1),
					],
				}
				saveProjectToLs(newState.projectName, newState.cards)

				return newState
			}),
	},
}))

export const useCards = () => useProjectStore((state) => state.cards)
export const useProjectName = () =>
	useProjectStore((state) => state.projectName)

export const useProjectActions = () => useProjectStore((state) => state.actions)
export const saveProjectAsAction =
	useProjectStore.getState().actions.saveProjectAs
export const loadProjectAsAction =
	useProjectStore.getState().actions.loadProject

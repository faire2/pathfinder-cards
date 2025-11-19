import { create } from 'zustand'

// Store state interface
interface ProjectStoreV2 {
	// Data
	cardLibrary: CardData[]
	projects: ProjectSummary[]
	currentProject: CurrentProject | null

	// UI State
	isLoading: boolean
	error: string | null

	// Actions
	actions: ProjectActionsV2
}

// Simplified project info for list/sidebar
interface ProjectSummary {
	id: string
	projectName: string
	cardCount: number
	updatedAt: string
}

// Full project with cards
interface CurrentProject {
	id: string
	projectName: string
	cards: CardData[]
}

interface ProjectActionsV2 {
	// Card Library Management
	loadCardLibrary: () => Promise<void>
	createCard: (card: Omit<CardData, 'id'>) => Promise<CardData>
	updateCard: (cardId: string, card: Partial<CardData>) => Promise<void>
	deleteCard: (cardId: string) => Promise<void>

	// Project Management
	loadProjects: () => Promise<void>
	loadProject: (projectId: string) => Promise<void>
	createProject: (projectName: string) => Promise<void>
	updateProject: (projectId: string, projectName: string) => Promise<void>
	deleteProject: (projectId: string) => Promise<void>

	// Project-Card Association
	addCardToProject: (projectId: string, cardId: string) => Promise<void>
	removeCardFromProject: (projectId: string, cardId: string) => Promise<void>

	// Utility
	clearError: () => void
}

const useProjectStoreV2 = create<ProjectStoreV2>((set, get) => ({
	// Initial state
	cardLibrary: [],
	projects: [],
	currentProject: null,
	isLoading: false,
	error: null,

	actions: {
		// ==================== CARD LIBRARY MANAGEMENT ====================

		// GET /api/cards - Fetch all user's cards
		loadCardLibrary: async () => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch('/api/cards')
				if (!response.ok) {
					throw new Error('Failed to load card library')
				}
				const cards = await response.json()
				set({ cardLibrary: cards, isLoading: false })
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// POST /api/cards - Create a new card
		// Returns the created card with ID
		createCard: async (cardData) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch('/api/cards', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(cardData),
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to create card')
				}

				const newCard = await response.json()

				// Update card library
				set((state) => ({
					cardLibrary: [...state.cardLibrary, newCard],
					isLoading: false,
				}))

				// Return the created card so caller can use the ID
				return newCard
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
				throw error // Re-throw so caller knows it failed
			}
		},

		// PUT /api/cards/[id] - Update an existing card
		updateCard: async (cardId, updates) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/cards/${cardId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updates),
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to update card')
				}

				const updatedCard = await response.json()

				// Update in card library
				set((state) => ({
					cardLibrary: state.cardLibrary.map((card) =>
						card.id === cardId ? updatedCard : card
					),
					// Also update in current project if present
					currentProject: state.currentProject
						? {
								...state.currentProject,
								cards: state.currentProject.cards.map((card) =>
									card.id === cardId ? updatedCard : card
								),
						  }
						: null,
					isLoading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// DELETE /api/cards/[id] - Delete a card
		deleteCard: async (cardId) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/cards/${cardId}`, {
					method: 'DELETE',
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to delete card')
				}

				// Remove from card library and current project
				set((state) => ({
					cardLibrary: state.cardLibrary.filter((card) => card.id !== cardId),
					currentProject: state.currentProject
						? {
								...state.currentProject,
								cards: state.currentProject.cards.filter(
									(card) => card.id !== cardId
								),
						  }
						: null,
					isLoading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// ==================== PROJECT MANAGEMENT ====================

		// GET /api/projects - Fetch all user's projects (summary)
		loadProjects: async () => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch('/api/projects')
				if (!response.ok) {
					throw new Error('Failed to load projects')
				}
				const projectsData = await response.json()

				// Transform to summary format
				const projects = projectsData.map((p: any) => ({
					id: p.id,
					projectName: p.projectName,
					cardCount: p.cards?.length || 0,
					updatedAt: p.updatedAt,
				}))

				set({ projects, isLoading: false })
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// GET /api/projects/[id] - Load a specific project with all its cards
		// KEY ORM QUERY: This uses the include we set up in the API route
		loadProject: async (projectId) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/projects/${projectId}`)
				if (!response.ok) {
					throw new Error('Failed to load project')
				}
				const projectData = await response.json()

				// Transform the nested structure from Prisma
				// projectData.cards = [{ card: {...}, addedAt: "..." }, ...]
				// We want just the card objects
				const cards = projectData.cards.map((pc: any) => pc.card)

				const currentProject: CurrentProject = {
					id: projectData.id,
					projectName: projectData.projectName,
					cards: cards,
				}

				set({ currentProject, isLoading: false })
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// POST /api/projects - Create a new project
		createProject: async (projectName) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch('/api/projects', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ projectName }),
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to create project')
				}

				const newProject = await response.json()

				// Add to projects list AND set as current project
				set((state) => ({
					projects: [
						...state.projects,
						{
							id: newProject.id,
							projectName: newProject.projectName,
							cardCount: 0,
							updatedAt: newProject.updatedAt,
						},
					],
					currentProject: {
						id: newProject.id,
						projectName: newProject.projectName,
						cards: [], // New project has no cards yet
					},
					isLoading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// PUT /api/projects/[id] - Update project name
		updateProject: async (projectId, projectName) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/projects/${projectId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ projectName }),
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to update project')
				}

				const updatedProject = await response.json()

				// Update in projects list and current project if applicable
				set((state) => ({
					projects: state.projects.map((p) =>
						p.id === projectId ? { ...p, projectName: updatedProject.projectName } : p
					),
					currentProject:
						state.currentProject?.id === projectId
							? { ...state.currentProject, projectName: updatedProject.projectName }
							: state.currentProject,
					isLoading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// DELETE /api/projects/[id] - Delete a project
		deleteProject: async (projectId) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/projects/${projectId}`, {
					method: 'DELETE',
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to delete project')
				}

				// Remove from projects list and clear current project if it was deleted
				set((state) => ({
					projects: state.projects.filter((p) => p.id !== projectId),
					currentProject:
						state.currentProject?.id === projectId ? null : state.currentProject,
					isLoading: false,
				}))
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// ==================== PROJECT-CARD ASSOCIATION ====================

		// POST /api/projects/[id]/cards - Add existing card to project
		// KEY ORM QUERY: Creates a ProjectCard join table entry
		addCardToProject: async (projectId, cardId) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(`/api/projects/${projectId}/cards`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ cardId }),
				})

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to add card to project')
				}

				const addedCard = await response.json()

				// Update current project if it's the one we're adding to
				set((state) => {
					if (state.currentProject?.id === projectId) {
						return {
							currentProject: {
								...state.currentProject,
								cards: [...state.currentProject.cards, addedCard],
							},
							// Update card count in projects list
							projects: state.projects.map((p) =>
								p.id === projectId ? { ...p, cardCount: p.cardCount + 1 } : p
							),
							isLoading: false,
						}
					}
					return {
						projects: state.projects.map((p) =>
							p.id === projectId ? { ...p, cardCount: p.cardCount + 1 } : p
						),
						isLoading: false,
					}
				})
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// DELETE /api/projects/[id]/cards/[cardId] - Remove card from project
		// KEY ORM QUERY: Deletes ProjectCard entry (card still exists in library!)
		removeCardFromProject: async (projectId, cardId) => {
			set({ isLoading: true, error: null })
			try {
				const response = await fetch(
					`/api/projects/${projectId}/cards/${cardId}`,
					{
						method: 'DELETE',
					}
				)

				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to remove card from project')
				}

				// Update current project if applicable
				set((state) => {
					if (state.currentProject?.id === projectId) {
						return {
							currentProject: {
								...state.currentProject,
								cards: state.currentProject.cards.filter(
									(card) => card.id !== cardId
								),
							},
							projects: state.projects.map((p) =>
								p.id === projectId ? { ...p, cardCount: p.cardCount - 1 } : p
							),
							isLoading: false,
						}
					}
					return {
						projects: state.projects.map((p) =>
							p.id === projectId ? { ...p, cardCount: p.cardCount - 1 } : p
						),
						isLoading: false,
					}
				})
			} catch (error: any) {
				set({ error: error.message, isLoading: false })
			}
		},

		// ==================== UTILITY ====================

		clearError: () => set({ error: null }),
	},
}))

// Selectors for easy access
export const useCardLibrary = () => useProjectStoreV2((state) => state.cardLibrary)
export const useProjects = () => useProjectStoreV2((state) => state.projects)
export const useCurrentProject = () => useProjectStoreV2((state) => state.currentProject)
export const useProjectLoading = () => useProjectStoreV2((state) => state.isLoading)
export const useProjectError = () => useProjectStoreV2((state) => state.error)
export const useProjectActionsV2 = () => useProjectStoreV2((state) => state.actions)

export default useProjectStoreV2
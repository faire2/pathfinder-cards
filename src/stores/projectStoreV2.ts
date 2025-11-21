import { create } from 'zustand'

// UI Store - Only for client-side UI state
// Server state (projects, cards) is now managed by TanStack Query
interface ProjectStoreV2 {
	// Which project is currently selected
	currentProjectId: string | null

	// Actions
	setCurrentProjectId: (id: string | null) => void
}

const useProjectStoreV2 = create<ProjectStoreV2>((set) => ({
	// Initial state
	currentProjectId: null,

	// Actions
	setCurrentProjectId: (id) => set({ currentProjectId: id }),
}))

// Selectors for easy access
export const useCurrentProjectId = () => useProjectStoreV2((state) => state.currentProjectId)
export const useSetCurrentProjectId = () => useProjectStoreV2((state) => state.setCurrentProjectId)

export default useProjectStoreV2
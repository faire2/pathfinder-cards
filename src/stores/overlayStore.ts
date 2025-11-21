import { projectPrefix } from '@/utils/localStorage'
import { create } from 'zustand'

interface OverlayStore extends OverlayData {
	actions: OverlayActions
}

interface OverlayActions {
	hideOverlay: () => void
	showLoadProjectOverlay: () => void
}

const initialState: OverlayData = {
	label: null,
	data: null,
	overlayType: null,
	onFinish: null,
}

// Helper to get localStorage project names
export function getLocalStorageProjectNames(): string[] {
	if (typeof window === 'undefined') return []
	const items = { ...localStorage }
	const prefixLength = projectPrefix.length
	const projects = Object.keys(items).filter(
		(key) => key.slice(0, prefixLength) === projectPrefix
	)
	return projects.map((project) => project.slice(prefixLength))
}

const useOverlayStore = create<OverlayStore>((set) => ({
	...initialState,

	actions: {
		hideOverlay: () =>
			set(() => ({ ...initialState })),
		showLoadProjectOverlay: () =>
			set(() => ({
				label: 'Switch Project',
				data: null,
				overlayType: 'projectSwitcher',
				onFinish: null,
			}))
	},
}))

export const useOverlayData = () => useOverlayStore((state) => ({
	label: state.label,
	overlayType: state.overlayType,
	data: state.data,
	onFinish: state.onFinish,
}))

export const useShowOverlay = () => useOverlayStore((state) => !!state.overlayType)

export const useOverlayActions = () => useOverlayStore((state) => state.actions)

import { projectPrefix } from '@/utils/localStorage'
import { create } from 'zustand'
import { loadProjectAsAction, saveProjectAsAction } from './projectStore'


interface OverlayStore extends OverlayData {
	actions: OverlayActions
}

interface OverlayActions {
	hideOverlay: () => void
	showSaveProjectAsOverlay: () => void
	showLoadProjectOverlay: () => void
}

const initialState: OverlayData = {
	label: null,
	data: null,
	overlayType: null,
	onFinish: null,
}

const useOverlayStore = create<OverlayStore>((set, get) => ({
	...initialState,

	actions: {
		hideOverlay: () =>
			set(() => ({ ...initialState })),
		showSaveProjectAsOverlay: () =>
			set(() => {
				console.log('settin overlay')
				return {
					label: 'Save Project As',
					data: null,
					overlayType: 'input',
					onFinish: saveProjectAsAction
				}
			}),
		showLoadProjectOverlay: () =>
			set(() => {
				const items = { ...localStorage }
				const prefixLength = projectPrefix.length
				const projects = Object.keys(items).filter(
					(key) => key.slice(0, prefixLength) === projectPrefix
				)
				const projectNames = projects.map((project) =>
					project.slice(prefixLength)
				)

				return {
					label: 'Load Project',
					data: projectNames,
					overlayType: 'listChoice',
					onFinish: loadProjectAsAction,
				}
			})
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

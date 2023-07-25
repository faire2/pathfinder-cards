interface CardData {
	id: string
	name: string
	type: string
	level: number | string
	traits: string
	actions: string
	body: string
	tags?: string[]
	plain?: number
	meta?: Meta
}

interface Meta {
	public: number
	url: string
}

interface CardDimensions {
	width: number
	height: number
}

interface Project {
	projectName: string
	cards: CardData[]
}

type View = 'importCard' | 'createCard' | 'projectView'
type Overlay = 'inputData' | 'listChoice' | 'noOverlay'

interface OverlayData {
	overlay: Overlay
	label: string
	data: string | string[]
	hideOverlay: () => void
	onFinish: Function
}

interface OverlayInputData {
	inputLabel: string
	onClick: (value: string) => void
}

type InputFunction = (value: string) => void

interface OverlayListChoiceData {
	items: string[]
	onClick: (value: any) => void
}

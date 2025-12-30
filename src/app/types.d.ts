interface Project {
	id: string
	projectName: string
	cards: CardData[]
}

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
	numberToPrint: number
}

interface Meta {
	public: number
	url: string
}

interface CardDimensions {
	width: number
	height: number
}

type OverlayType = 'input' | 'listChoice' | 'projectSwitcher' | 'projectImporter'

interface OverlayData {
	label: string | null
	data: string | string[] | null
	overlayType: OverlayType | null
	onFinish: Function | null
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

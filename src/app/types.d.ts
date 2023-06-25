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

type View = 'cardImport' | 'projectView'

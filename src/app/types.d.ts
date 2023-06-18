interface CardData {
	id: string
	name: string
	type: string
	level: number | string
	traits: string
	actions: Actions
	body: string
	tags?: string[]
	plain?: number
	meta?: Meta
}

type Actions = 'a' | 'aa' | 'aaa' | 'r' | 'f' | ''

interface Meta {
	public: number
	url: string
}

interface CardDimension {
	width: number
	height: number
}

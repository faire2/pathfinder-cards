interface CardData {
	id: string
	tags: string[]
	name: string
	type: string
	level: string
	traits: string
	actions: Actions
	body: string
	plain: number
	meta: Meta
}

type Actions = 'a' | 'aa' | 'aaa' | 'r' | 'f'

interface Meta {
	public: number
	url: string
}

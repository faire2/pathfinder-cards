const standardCardsKey = 'pf2cards'

export function saveCardsToLocalStorage(cards: CardData[], key?: string) {
	try {
		const serializedData = JSON.stringify(cards)
		localStorage.setItem(key ?? standardCardsKey, serializedData)
	} catch (error) {
		console.error('Error saving cards to local storage:', error)
	}
}

export function loadCardsFromLocalStorage(key?: string): CardData[] {
	const storedCards = localStorage.getItem(key ?? standardCardsKey)
	if (storedCards) {
		return JSON.parse(storedCards)
	}

	console.error(`Cards could not have been loaded from local storage with ${key ?? 'default key'}.`)
	return []
}

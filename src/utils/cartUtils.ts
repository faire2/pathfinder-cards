export const isCardData = (value: Object): value is CardData =>
	value &&
	value.hasOwnProperty('id') &&
	value.hasOwnProperty('name') &&
	value.hasOwnProperty('type') &&
	value.hasOwnProperty('level') &&
	value.hasOwnProperty('traits') &&
	value.hasOwnProperty('actions') &&
	value.hasOwnProperty('body')

export type Character = {
	_id: string
	name: string
	race: string
	gender: string
}

export type Quote = {
	id: string
	dialog: string
}

export type CharactersResponse = {
	docs: Character[]
	limit: number
	offset: number
	page: number
	total: number
}

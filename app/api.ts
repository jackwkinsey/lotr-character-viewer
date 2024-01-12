'use server'

import type { CharactersResponse, Quote } from './types'

const base_url = 'https://the-one-api.dev/v2'

export async function getCharacters(
	numberPerPage: number = 10,
	page: number = 1
): Promise<CharactersResponse> {
	const res = await fetch(
		`${base_url}/character/?limit=${numberPerPage}&page=${page}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.ONE_API_KEY}`,
			},
		}
	)
	return await res.json()
}

export async function getCharacterQuotes(
	characterId: string,
	numberOfQuotes: number = 2
): Promise<Quote[]> {
	const res = await fetch(`${base_url}/character/${characterId}/quote`, {
		headers: {
			Authorization: `Bearer ${process.env.ONE_API_KEY}`,
		},
	})
	const data = await res.json()
	let quotesData = data.docs
	if (quotesData.length > numberOfQuotes) {
		quotesData = quotesData.slice(0, numberOfQuotes)
	}
	return quotesData
}

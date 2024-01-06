'use client'

import { useEffect, useState } from 'react'

import Modal from './Modal'
import type { Character, Quote } from '../types'

export default function CharacterViewer() {
	const [characters, setCharacters] = useState([])
	const [characterSelected, setCharacterSelected] = useState<Character | null>(
		null
	)
	const [quotes, setQuotes] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		// TODO: pull API methods (getCharacters and getCharacterQuotes) out into API file
		const getCharacters = async () => {
			const res = await fetch(
				// TODO: use base URL so we aren't typing it all the time
				// TODO: configure the character limit so other limits could be used
				'https://the-one-api.dev/v2/character/?limit=10',
				{
					headers: {
						// TODO: don't hard code the bearer token :)
						Authorization: 'Bearer Zsmdiwp18H6GxN2RYp2X',
					},
				}
			)
			const data = await res.json()
			setCharacters(data.docs)
		}
		getCharacters()
	}, [])

	const getCharacterQuotes = async (characterId: string) => {
		const res = await fetch(
			`https://the-one-api.dev/v2/character/${characterId}/quote`,
			{
				headers: {
					Authorization: 'Bearer Zsmdiwp18H6GxN2RYp2X',
				},
			}
		)
		const data = await res.json()
		let quotesData = data.docs
		if (quotesData.length > 2) {
			quotesData = quotesData.slice(0, 2)
		}
		setQuotes(quotesData)
	}

	const handleClick = async (character: Character) => {
		getCharacterQuotes(character._id)
		setCharacterSelected(character)
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	// TODO: implement pagination so we could page through the character list
	// TODO: implement search/filtering so we could quickly find the character we're interested in
	const characterListItems = characters.map((character: Character) => (
		<li key={character._id} onClick={() => handleClick(character)}>
			{character.name}
		</li>
	))

	// TODO: dim and make background un-clickable when the modal is opened
	return (
		<>
			<ul>{characterListItems}</ul>
			{isOpen && (
				<Modal onClose={closeModal}>
					<div>
						Name: <span className="font-bold">{characterSelected?.name}</span>
					</div>
					<div>
						Race: <span className="font-bold">{characterSelected?.race}</span>
					</div>
					<div>
						Gender:{' '}
						<span className="font-bold">{characterSelected?.gender}</span>
					</div>
					<div>
						Quotes: {!quotes.length && 'No quotes found'}
						<ul>
							{quotes.map((quote: Quote) => (
								<li key={quote.id} className="block list-disc">
									&quot;{quote.dialog}&quot;
								</li>
							))}
						</ul>
					</div>
				</Modal>
			)}
		</>
	)
}

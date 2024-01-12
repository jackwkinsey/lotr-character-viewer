'use client'

import { useEffect, useState } from 'react'

import Modal from './Modal'
import type { Character, Quote } from '../types'
import { getCharacterQuotes, getCharacters } from '../api'

export default function CharacterViewer() {
	const [characters, setCharacters] = useState<Character[]>([])
	const [characterSelected, setCharacterSelected] = useState<Character | null>(
		null
	)
	const [quotes, setQuotes] = useState<Quote[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const loadCharacters = async () => {
			const charactersRes = await getCharacters()
			setCharacters(charactersRes.docs)
			setPage(charactersRes.page)
			setTotalPages(charactersRes.pages)
		}
		loadCharacters()
	}, [])

	useEffect(() => {
		setQuotes([])
		const getQuotes = async () => {
			if (characterSelected) {
				const characterQuotes = await getCharacterQuotes(characterSelected._id)
				setQuotes(characterQuotes)
			}
		}
		getQuotes()
	}, [characterSelected])

	const handleClick = async (character: Character) => {
		setCharacterSelected(character)
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const goToPage = async (pageNumber: number) => {
		const charactersRes = await getCharacters(10, pageNumber)
		setPage(pageNumber)
		setCharacters(charactersRes.docs)
		setTotalPages(charactersRes.pages)
	}

	// TODO: implement search/filtering so we could quickly find the character we're interested in
	const characterListItems = characters.map((character: Character) => (
		<li
			key={character._id}
			onClick={() => handleClick(character)}
			className="hover:cursor-pointer"
		>
			{character.name}
		</li>
	))

	return (
		<>
			<ul>{characterListItems}</ul>

			<div>
				<span className="hover:cursor-pointer" onClick={() => goToPage(1)}>
					first
				</span>{' '}
				<span
					className="hover:cursor-pointer"
					onClick={() => goToPage(page > 1 ? page - 1 : 1)}
				>
					prev
				</span>{' '}
				<span
					className="hover:cursor-pointer"
					onClick={() => goToPage(page + 1)}
				>
					next
				</span>{' '}
				<span
					className="hover:cursor-pointer"
					onClick={() => goToPage(totalPages)}
				>
					last
				</span>
			</div>

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
								<li key={quote.id} className="block ml-4">
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

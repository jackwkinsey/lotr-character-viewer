'use client'

import { ReactNode } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({
	onClose,
	children,
}: {
	onClose: () => void
	children: ReactNode
}) {
	return (
		<>
			<div
				className="w-screen h-screen absolute top-0 left-0 bg-gray-500/80 hover:cursor-pointer"
				onClick={onClose}
			></div>
			<div className="bg-white text-black w-[600px] p-8 absolute">
				<div className="flex justify-end">
					<button onClick={onClose}>
						<XMarkIcon className="h-4 w-4" />
					</button>
				</div>
				<div className="flex flex-col">{children}</div>
			</div>
		</>
	)
}

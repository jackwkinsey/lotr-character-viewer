'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'

export default function Modal({
	onClose,
	children,
}: {
	onClose: MouseEventHandler<HTMLButtonElement>
	children: ReactNode
}) {
	return (
		<div className="bg-white text-black w-[600px] p-8 flex flex-col items-center absolute">
			{children}
			<button onClick={onClose} className="mt-8 text-sm">
				Close
			</button>
		</div>
	)
}

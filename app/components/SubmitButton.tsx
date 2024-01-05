'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton({ text }: { text: string }) {
	const { pending } = useFormStatus()
	return (
		<button
			className="block p-2 mt-8 bg-teal-600 text-white disabled:bg-teal-400 disabled:text-gray-400"
			type="submit"
			disabled={pending}
			aria-disabled={pending}
		>
			{text}
		</button>
	)
}

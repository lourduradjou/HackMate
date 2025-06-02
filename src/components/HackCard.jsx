import React from 'react'
import { registerEventAPI } from '../api' // make sure you create this API

export default function HackCard({
	id,
	title,
	date,
	location,
	type,
	description,
}) {
	const role = localStorage.getItem('role')

	const getTypeColor = (type) => {
		switch (type.toLowerCase()) {
			case 'beginner':
				return 'bg-green-200 text-green-800'
			case 'intermediate':
				return 'bg-yellow-200 text-yellow-800'
			case 'advanced':
				return 'bg-red-200 text-red-800'
			case 'expert':
				return 'bg-violet-200 text-violet-800'
			default:
				return 'bg-gray-200 text-gray-800'
		}
	}

	const handleRegister = async () => {
		const userEmail = localStorage.getItem('email')

		if (!userEmail) {
			alert('You must be logged in to register for the event.')
			return
		}

		const confirm = window.confirm(
			`Do you want to register for "${title}"?`
		)

		if (!confirm) return

		try {
			await registerEventAPI(id, userEmail)
			alert('You have successfully registered for the event.')
		} catch (err) {
			console.error(err)
			alert('Registration failed: ' + (err.message || 'Unknown error'))
		}
	}

	return (
		<div className='min-w-[200px] max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
			<div className='p-5 flex justify-between flex-col'>
				<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
					{title}
				</h5>
				<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
					{description}
				</p>
				<div className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
					<div>Date: {date}</div>
					<div>Location: {location}</div>
				</div>
				<div className='flex justify-between items-center gap-2 flex-wrap'>
					{role !== 'host' ? (
						<button
							onClick={handleRegister}
							className='px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700'
						>
							Register
						</button>
					) : (
						''
					)}

					<div
						className={`px-3 py-1 rounded-lg text-sm font-semibold ${getTypeColor(
							type
						)}`}
					>
						{type}
					</div>
				</div>
			</div>
		</div>
	)
}

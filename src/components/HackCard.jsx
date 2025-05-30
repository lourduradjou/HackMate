import { Link } from 'react-router-dom'
import { useEffect } from 'react'
// import image1 from '../assets/images/image3.jpg'
// import image2 from '../assets/images/image1.jpg'
// import image3 from '../assets/images/image2.jpg'

export default function HackCard({ id, title, date, location, type, description }) {

	const getTypeColor = (type) => {
		switch (type.toLowerCase()) {
			case 'beginner': return 'bg-green-200 text-green-800'
			case 'intermediate': return 'bg-yellow-200 text-yellow-800'
			case 'advanced': return 'bg-red-200 text-red-800'
			case 'expert': return 'bg-violet-200 text-violet-800'
			default: return 'bg-gray-200 text-gray-800'
		}
	}

	const handleRegister = async () => {
		const userEmail = localStorage.getItem('email')

		if (!userEmail) {
			alert('You must be logged in to register for the event.')
			return
		}

		const confirm = window.confirm(`Do you want to register for "${title}"?`)

		if (!confirm) return

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ eventId: id, email: userEmail }),
			})

			if (response.ok) {
				alert('You have successfully registered for the event.')
			} else {
				const error = await response.json()
				alert('Registration failed: ' + (error.message || 'Unknown error'))
			}
		} catch (err) {
			console.error(err)
			alert('An error occurred while registering.')
		}
	}

	return (
		<div className='flex-1  max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
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
					{/* <Link
						to={`/events/${id}`}
						className='inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Read more
						<svg
							className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 10'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M1 5h12m0 0L9 1m4 4L9 9'
							/>
						</svg>
					</Link> */}
					<button
						onClick={handleRegister}
						className='px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700'
					>
						Register
					</button>
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

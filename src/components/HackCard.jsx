import React, { useEffect, useState } from 'react'

import image1 from '../assets/images/image3.jpg'
import image2 from '../assets/images/image1.jpg'
import image3 from '../assets/images/image2.jpg'

export default function HackCard({ title, date, location, type, description }) {
	const [imageUrl, setImageUrl] = useState('')

	// Function to map type to color
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

	useEffect(() => {
		// Array of imported images
		const images = [image1, image2, image3]

		// Select random image
		const randomIndex = Math.floor(Math.random() * images.length)
		setImageUrl(images[randomIndex])
	}, [])

	return (
		<div>
			<div className='flex-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
				<a href='#'>
					<img
						className='rounded-t-lg w-full h-48 object-cover'
						src={imageUrl} // Random local image
						alt='Hackathon'
					/>
				</a>
				<div className='p-5'>
					<a href='#'>
						<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							{title}
						</h5>
					</a>
					<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
						{description}
					</p>
					<div className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
						<div>Date: {date}</div>
						<div>Location: {location}</div>
					</div>
					<div className='flex justify-between items-center'>
						<a
							href='#'
							className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
						</a>
						{/* Type with Dynamic Color */}
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
		</div>
	)
}

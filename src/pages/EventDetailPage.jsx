import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

export default function EventDetailPage() {
	const { id } = useParams()
	const [event, setEvent] = useState(null)

	useEffect(() => {
		// You can replace this with an API call later
		const allEvents = [
			{
				id: 11,
				eventName: 'Goldman Hackatho',
				date: '2025-05-31',
				location: 'Belgium',
				eventType: 'Advanced',
				description: 'have a fun day',
			},
			{
				id: 12,
				eventName: 'Goldman Hackatho',
				date: '2025-05-31',
				location: 'Belgium',
				eventType: 'Advanced',
				description: 'have a fun day',
			},
			{
				id: 13,
				eventName: 'Goldman Hackatho',
				date: '2025-05-31',
				location: 'Belgium',
				eventType: 'Advanced',
				description: 'have a fun day',
			},
			{
				id: 6,
				eventName: 'Code for Google',
				date: '2025-06-12',
				location: 'Belgium',
				eventType: 'Advanced',
				description:
					'HI there, join un in live for the world leve event',
			},
			{
				id: 7,
				eventName: 'PTU hackathon',
				date: '2025-06-15',
				location: 'Pondy',
				eventType: 'Intermediate',
				description: 'cccc',
			},
			{
				id: 8,
				eventName: 'PTU hackathon',
				date: '2025-06-15',
				location: 'Pondy',
				eventType: 'Intermediate',
				description: 'cccc',
			},
			{
				id: 9,
				eventName: 'PTU hackathon',
				date: '2025-06-15',
				location: 'kerala',
				eventType: 'Intermediate',
				description: 'cccc',
			},
			{
				id: 10,
				eventName: 'PTU hackathon',
				date: '2025-06-15',
				location: 'kerala',
				eventType: 'Intermediate',
				description: 'cccc',
			},
			{
				id: 4,
				eventName: 'HackNITR 2025',
				date: '2025-08-05',
				location: 'NIT Rourkela, Odisha',
				eventType: 'In-Person',
				description:
					'HackNITR returns with challenges in fintech, healthtech, and sustainability domains.',
			},
			{
				id: 5,
				eventName: 'HackNITR 2025',
				date: '2025-08-05',
				location: 'NIT Rourkela, Odisha',
				eventType: 'In-Person',
				description:
					'HackNITR returns with challenges in fintech, healthtech, and sustainability domains.',
			},
			{
				id: 2,
				eventName: 'CodeStorm 5.1',
				date: '2025-08-15',
				location: 'Online',
				eventType: 'Virtual',
				description:
					'An online hackathon for students to develop impactful web and mobile apps for social good.',
			},
		]

		const foundEvent = allEvents.find((e) => e.id === parseInt(id))
		setEvent(foundEvent)
	}, [id])

	if (!event)
		return <div className='text-center text-white'>Event not found</div>

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow dark:bg-gray-800 mt-10'>
			<h1 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
				{event.eventName}
			</h1>
			<p className='text-gray-700 dark:text-gray-300 mb-2'>
				<strong>Date:</strong> {event.date}
			</p>
			<p className='text-gray-700 dark:text-gray-300 mb-2'>
				<strong>Location:</strong> {event.location}
			</p>
			<p className='text-gray-700 dark:text-gray-300 mb-2'>
				<strong>Type:</strong> {event.eventType}
			</p>
			<p className='text-gray-700 dark:text-gray-300 mt-4'>
				{event.description}
			</p>
			{/* Add more detailed content here if you want */}
		</div>
	)
}

import React, { useEffect, useState } from 'react'
import { cancelEvent, fetchMyEvents } from '../api'

import { FaTimesCircle } from 'react-icons/fa'

export default function MyRegisteredEventsPage() {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const email = localStorage.getItem('email')

	useEffect(() => {
		async function loadEvents() {
			try {
				const data = await fetchMyEvents(email)
				setEvents(data)
			} catch (err) {
				console.error(err)
				setError('Failed to load your registered events')
			} finally {
				setLoading(false)
			}
		}

		loadEvents()
	}, [email])

	const handleCancel = async (eventId) => {
		try {
			await cancelEvent(eventId, email)
			setEvents((prev) => prev.filter((e) => e._id !== eventId))
		} catch (err) {
			console.error('Failed to cancel event', err)
			alert('Failed to cancel event')
		}
	}

	if (loading) return <div className='text-center text-gray-300'>Loading...</div>
	if (error) return <div className='text-center text-red-500'>{error}</div>

	return (
		<div className='p-10 text-gray-200'>
			<h2 className='text-3xl font-bold mb-6'>My Registered Events</h2>

			{events.length === 0 ? (
				<div className='text-gray-400'>You have not registered for any events.</div>
			) : (
				<div className='overflow-x-auto'>
					<table className='min-w-full table-auto border-collapse border border-gray-700'>
						<thead>
							<tr className='bg-gray-800'>
								<th className='border border-gray-700 px-4 py-2'>Event Name</th>
								<th className='border border-gray-700 px-4 py-2'>Date</th>
								<th className='border border-gray-700 px-4 py-2'>Location</th>
								<th className='border border-gray-700 px-4 py-2'>Type</th>
								<th className='border border-gray-700 px-4 py-2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event) => (
								<tr key={event._id} className='hover:bg-gray-800'>
									<td className='border border-gray-700 px-4 py-2'>{event.eventName}</td>
									<td className='border border-gray-700 px-4 py-2'>{event.date}</td>
									<td className='border border-gray-700 px-4 py-2'>{event.location}</td>
									<td className='border border-gray-700 px-4 py-2'>{event.eventType}</td>
									<td className='border border-gray-700 px-4 py-2 text-center'>
										<button
											onClick={() => handleCancel(event._id)}
											className='text-red-500 hover:text-red-700'
											title='Cancel Registration'
										>
											<FaTimesCircle size={20} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

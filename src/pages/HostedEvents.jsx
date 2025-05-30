import React, { useEffect, useState } from 'react'
import { fetchAllEventsHostedAPI, removeEventAPI, updateEventAPI } from '../api'

export default function HostedEventsPage() {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const email = localStorage.getItem('email')

	useEffect(() => {
		async function fetchEvents() {
			try {
				const data = await fetchAllEventsHostedAPI(email)
				setEvents(data)
			} catch (err) {
				setError('Failed to load events')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		fetchEvents()
	}, [email])

	const handleDelete = async (eventId) => {
		try {
			await removeEventAPI(eventId)
			setEvents((prev) => prev.filter((event) => event._id !== eventId))
		} catch (err) {
			console.error('Failed to delete event', err)
			alert('Failed to delete event')
		}
	}

	const handleEdit = async (eventId) => {
		// TODO: Open a modal or navigate to edit form
		alert(`Stub: Edit event ${eventId}`)
	}

	if (loading)
		return <div className='text-center text-gray-300'>Loading...</div>
	if (error) return <div className='text-center text-red-500'>{error}</div>

	return (
		<div className='p-10 text-gray-200'>
			<h2 className='text-3xl font-bold mb-6'>My Hosted Events</h2>
			{events.length === 0 ? (
				<div className='text-gray-400'>No events found.</div>
			) : (
				<ul className='space-y-6'>
					{events.map((event) => (
						<li
							key={event._id}
							className='border border-gray-700 rounded-lg p-4 flex justify-between items-center'
						>
							<div>
								<h3 className='text-xl font-semibold'>
									{event.eventName}
								</h3>
								<p className='text-sm text-gray-400'>
									{event.date}
								</p>
								<p className='text-sm'>{event.location}</p>
								<p className='text-sm'>{event.eventType}</p>
								<p className='text-sm'>{event.description}</p>
							</div>
							<div className='space-x-2'>
								<button
									onClick={() => handleEdit(event._id)}
									className='px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-black'
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(event._id)}
									className='px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white'
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

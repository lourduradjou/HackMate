import React, { useEffect, useState } from 'react'
import { fetchAllEventsHostedAPI, removeEventAPI, updateEventAPI } from '../api'

export default function HostedEventsPage() {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingEvent, setEditingEvent] = useState(null) // event being edited
	const [formData, setFormData] = useState({
		eventName: '',
		date: '',
		location: '',
		eventType: '',
		description: '',
	})

	const email = localStorage.getItem('email')

	useEffect(() => {
		async function fetchEvents() {
			try {
				const data = await fetchAllEventsHostedAPI(email)
				setEvents(data.events)
				setError(null)
			} catch (err) {
				if (err.message.includes('404')) {
					setEvents([])
					setError('No events hosted.')
				} else {
					setError('Failed to load events.')
					console.error(err)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchEvents()
	}, [email])

	const handleDelete = async (eventId) => {
		try {
			await removeEventAPI(eventId)
			setEvents((prev) => prev.filter((event) => event.id !== eventId))
		} catch (err) {
			console.error('Failed to delete event', err.message)
			alert('Failed to delete event')
		}
	}

	const openEditModal = (event) => {
		setEditingEvent(event)
		setFormData({
			eventName: event.eventName,
			date: event.date,
			location: event.location,
			eventType: event.eventType,
			description: event.description,
		})
	}

	const handleEditSubmit = async (e) => {
		e.preventDefault()
		try {
			await updateEventAPI(
				editingEvent.id,
				formData.eventName,
				formData.date,
				formData.location,
				formData.eventType,
				formData.description
			)
			setEvents((prev) =>
				prev.map((ev) =>
					ev.id === editingEvent.id ? { ...ev, ...formData } : ev
				)
			)
			setEditingEvent(null)
		} catch (err) {
			console.error('Failed to update event', err.message)
			alert('Failed to update event')
		}
	}

	if (loading)
		return <div className='text-center text-gray-300'>Loading...</div>

	if (error) return <div className='text-center text-red-500'>{error}</div>

	return (
		<div className='p-10 text-gray-200'>
			<h2 className='text-3xl font-bold mb-6'>My Hosted Events</h2>
			{events.length === 0 ? (
				<div className='text-gray-400'>No events hosted.</div>
			) : (
				<ul className='space-y-6'>
					{events.map((event) => (
						<li
							key={event.id}
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
									onClick={() => openEditModal(event)}
									className='px-3 py-1 rounded cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black'
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(event.id)}
									className='px-3 py-1 rounded cursor-pointer bg-red-500 hover:bg-red-600 text-white'
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			{/* Edit Modal */}
			{editingEvent && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-gray-800 p-6 rounded-lg w-96'>
						<h3 className='text-xl mb-4'>Edit Event</h3>
						<form onSubmit={handleEditSubmit} className='space-y-3'>
							<input
								type='text'
								value={formData.eventName}
								onChange={(e) =>
									setFormData({
										...formData,
										eventName: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Event Name'
								required
							/>
							<input
								type='date'
								value={formData.date}
								onChange={(e) =>
									setFormData({
										...formData,
										date: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								required
							/>
							<input
								type='text'
								value={formData.location}
								onChange={(e) =>
									setFormData({
										...formData,
										location: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Location'
								required
							/>
							<input
								type='text'
								value={formData.eventType}
								onChange={(e) =>
									setFormData({
										...formData,
										eventType: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Event Type'
								required
							/>
							<textarea
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Description'
								required
							/>
							<div className='flex justify-end space-x-2'>
								<button
									type='button'
									onClick={() => setEditingEvent(null)}
									className='px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='px-3 py-1 rounded bg-green-500 cursor-pointer hover:bg-green-600 text-white'
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

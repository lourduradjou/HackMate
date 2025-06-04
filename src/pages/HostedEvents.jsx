import React, { useEffect, useState } from 'react'
import {
	fetchAllEventsHostedAPI,
	getEventRegistration,
	removeEventAPI,
	updateEventAPI,
} from '../api'

export default function HostedEventsPage() {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingEvent, setEditingEvent] = useState(null)
	const [viewingRegistrations, setViewingRegistrations] = useState(null)
	const [registrations, setRegistrations] = useState([])

	const [formData, setFormData] = useState({
		eventName: '',
		date: '',
		location: '',
		eventType: '',
		description: '',
		teamSize: '', // Default to 1 if not provided
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
			teamSize: event.maxTeamSize || 1, // Default to empty if not provided
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
				formData.description,
				formData.teamSize
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

	const handleViewRegistrations = async (eventId) => {
		try {
			const data = await getEventRegistration(eventId)
			setRegistrations(data)
			setViewingRegistrations(eventId)
		} catch (err) {
			console.error('Failed to fetch registrations', err.message)
			alert('Failed to fetch registrations')
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
								<p className='text-sm'>Team size : {event.maxTeamSize}</p>
								<p className='text-sm'>{event.description}</p>
							</div>
							<div className='space-x-2 flex'>
								<button
									onClick={() =>
										handleViewRegistrations(event.id)
									}
									className='px-3 py-1 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 text-white'
								>
									View Registrations
								</button>
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
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
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
							<input
								type='number'
								value={formData.teamSize}
								onChange={(e) =>
									setFormData({
										...formData,
										teamSize: e.target.value,
									})
								}
								className='w-full p-2 rounded bg-gray-700 text-white'
								placeholder='Max Team Size'
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

			{/* Registration Modal */}
			{viewingRegistrations && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-gray-900 p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto'>
						<h3 className='text-xl font-semibold mb-4'>
							Registrations
						</h3>
						{registrations.length === 0 ? (
							<p className='text-gray-400'>
								No one has registered yet.
							</p>
						) : (
							<ul className='space-y-2'>
								{registrations.map((reg, idx) => (
									<li
										key={idx}
										className='p-3 border border-gray-700 rounded'
									>
										<p className='text-white'>
											<strong>Email:</strong> {reg.email}
										</p>
										<p className='text-white'>
											<strong>Teammates:</strong> {reg.teammates.map((email, i) => <span>{email} , </span> )}
										</p>
										<p className='text-gray-400 text-sm'>
											Registered on: {reg.registeredOn}
										</p>
									</li>
								))}
							</ul>
						)}
						<div className='mt-4 text-right'>
							<button
								onClick={() => {
									setViewingRegistrations(null)
									setRegistrations([])
								}}
								className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

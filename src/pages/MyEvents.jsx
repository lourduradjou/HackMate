import React, { useEffect, useState } from 'react'
import { cancelEvent, fetchMyEvents } from '../api' // adjust path if needed

import { useNavigate } from 'react-router-dom'

const MyEvents = () => {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	console.log(events)

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (!email) {
			navigate('/login')
			return
		}

		const loadEvents = async () => {
			try {
				const res = await fetchMyEvents({ email }) // ensure API matches this shape
				setEvents(res)
			} catch (err) {
				console.error(err)
				setError('❌ Failed to fetch your registered events.')
			} finally {
				setLoading(false)
			}
		}

		loadEvents()
	}, [navigate])

	const handleCancel = async (eventId) => {
		const email = localStorage.getItem('email')
		if (!email) {
			alert('Please log in again.')
			navigate('/login')
			return
		}

		try {
			await cancelEvent(eventId, email)
			setEvents((prev) =>
				prev.filter((item) => item.event.id !== eventId)
			)
			alert('✅ Event registration canceled.')
		} catch (err) {
			console.error('Failed to cancel event:', err)
			alert('❌ Failed to cancel event.')
		}
	}

	if (loading) {
		return (
			<p className='text-center text-gray-200 mt-10'>
				Loading your events...
			</p>
		)
	}

	if (error) {
		return <p className='text-center text-red-500 mt-10'>{error}</p>
	}

	if (events.length === 0) {
		return (
			<p className='text-center text-gray-400 mt-10'>
				No events registered.
			</p>
		)
	}

	return (
		<div className='w-4/5 mx-auto mt-10'>
			<h2 className='text-2xl font-bold mb-6 text-center text-gray-200'>
				My Registered Events
			</h2>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th className='px-6 py-3'>Event Name</th>
							<th className='px-6 py-3'>Date</th>
							<th className='px-6 py-3'>Location</th>
							<th className='px-6 py-3'>Type</th>
							<th className='px-6 py-3'>Teammates</th>
							<th className='px-6 py-3'>Registered On</th>
							<th className='px-6 py-3'>Description</th>
							<th className='px-6 py-3'>Action</th>
						</tr>
					</thead>
					<tbody>
						{events.map((item, index) => (
							<tr
								key={index}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							>
								<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{item.event.eventName}
								</td>
								<td className='px-6 py-4'>{item.event.date}</td>
								<td className='px-6 py-4'>
									{item.event.location}
								</td>
								<td className='px-6 py-4'>
									{item.event.eventType}
								</td>
								<td className='px-6 py-4'>
									{item.teammates.map((email, i) => <div key={i}>{email}</div>)}
									<div >{item.email}</div>
								</td>
								<td className='px-6 py-4'>
									{item.registeredOn}
								</td>
								<td className='px-6 py-4'>
									{item.event.description.length > 50
										? `${item.event.description.slice(0, 50)}...`
										: item.event.description}
								</td>
								<td className='px-6 py-4'>
									<button
										onClick={() =>
											handleCancel(item.event.id)
										}
										className='text-red-500 hover:text-red-700 cursor-pointer font-semibold'
									>
										Cancel
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default MyEvents

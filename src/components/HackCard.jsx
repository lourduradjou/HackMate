import React, { useState } from 'react'
import { registerEventAPI } from '../api'

export default function HackCard({
	id,
	title,
	date,
	location,
	type,
	description,
	teamSize = 1,
	isRegistered = false,
}) {
	const role = localStorage.getItem('role')
	const [showTeamModal, setShowTeamModal] = useState(false)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [teammates, setTeammates] = useState([])
	const [newEmail, setNewEmail] = useState('')
	const [error, setError] = useState('')

	const getTypeColor = (type) => {
		switch (type.toLowerCase()) {
			case 'beginner': return 'bg-green-200 text-green-800'
			case 'intermediate': return 'bg-yellow-200 text-yellow-800'
			case 'advanced': return 'bg-red-200 text-red-800'
			case 'expert': return 'bg-violet-200 text-violet-800'
			default: return 'bg-gray-200 text-gray-800'
		}
	}

	const openTeamModal = () => {
		setTeammates([])
		setNewEmail('')
		setError('')
		setShowTeamModal(true)
	}

	

	const addTeammate = () => {
		if (!newEmail.trim()) return
		if (teammates.length >= teamSize - 1) {
			setError(`You can only add up to ${teamSize - 1} teammates.`)
			return
		}
		if (teammates.includes(newEmail)) {
			setError('This email is already added.')
			return
		}
		setTeammates((prev) => [...prev, newEmail])
		setNewEmail('')
		setError('')
	}

	const removeTeammate = (email) => {
		setTeammates((prev) => prev.filter((t) => t !== email))
	}

	const confirmRegistration = async () => {
		const userEmail = localStorage.getItem('email')
		if (!userEmail) return

		try {
			await registerEventAPI(id, userEmail, teammates)
			setShowConfirmModal(false)
			setShowTeamModal(false)
			alert('You have successfully registered for the event.')
		} catch (err) {
			console.error(err)
			alert('Registration failed: ' + (err.message || 'Unknown error'))
		}
	}

	return (
		<div className='min-w-[400px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
			<div className='p-5 flex flex-1 h-full justify-between flex-col'>
				<div>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
					<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{description}</p>
					<div className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
						<div>Date: {date}</div>
						<div>Location: {location}</div>
					</div>
				</div>
				<div className='flex justify-between items-center gap-2 flex-wrap'>
					<div>Team Size: {teamSize}</div>

					{role !== 'host' &&(
						<button
							disabled={isRegistered}
							onClick={openTeamModal}
							className={`px-3 py-2 text-sm font-medium text-white ${isRegistered ? "cursor-disabled" : "cursor-pointer"} ${isRegistered ? "bg-gray-600" : "bg-green-600"} rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300  dark:focus:ring-green-700`}
						>
							{isRegistered ? "Regitered" :"Register"}
						</button>
					)}

					<div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getTypeColor(type)}`}>
						{type}
					</div>
				</div>
			</div>

			{/* Team Modal */}
			{showTeamModal && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md'>
						<h2 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>Add Teammates ({`${teammates.length+1}/${teamSize}`})</h2>

						<div className='mb-3 flex'>
							<input
								type='email'
								className='flex-1 px-3 py-2 border border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-white'
								placeholder='Enter teammate email'
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
							/>
							<button
								onClick={addTeammate}
								className='px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700'
							>
								Add
							</button>
						</div>

						{error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

						<ul className='mb-4'>
							{teammates.map((email, i) => (
								<li key={i} className='flex justify-between items-center mb-1'>
									<span className='text-sm text-gray-800 dark:text-gray-200'>{email}</span>
									<button
										onClick={() => removeTeammate(email)}
										className='text-red-500 hover:text-red-700 text-xs'
									>
										Remove
									</button>
								</li>
							))}
						</ul>

						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setShowTeamModal(false)}
								className='px-4 py-2 text-sm text-gray-700 dark:text-white border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700'
							>
								Cancel
							</button>
							<button
								onClick={() => setShowConfirmModal(true)}
								className='px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700'
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Confirmation Modal */}
			{showConfirmModal && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-sm'>
						<h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>Confirm Registration</h3>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
							Are you sure you want to register for <strong>{title}</strong> with {teammates.length} teammate(s)?
						</p>

						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setShowConfirmModal(false)}
								className='px-4 py-2 text-sm text-gray-700 dark:text-white border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700'
							>
								Back
							</button>
							<button
								onClick={confirmRegistration}
								className='px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700'
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

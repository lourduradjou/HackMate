import React, { useEffect, useState } from 'react'

import { addEventAPI } from '../api'
import { useNavigate } from 'react-router-dom'

export default function AddEvents() {
	let email;
	const [formData, setFormData] = useState({
		title: '',
		date: '',
		location: '',
		type: '',
		description: '',
		hostedBy: email,
	})
	const navigate = useNavigate()
	useEffect(() => {
		email = localStorage.getItem('email')
		if (!email) {
			navigate('/login')
			return
		}else {
			
		}
	})

	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setMessage('')
		setError('')

		try {
			const response = await addEventAPI(
				formData.title,
				formData.date,
				formData.location,
				formData.type,
				formData.description
			)
			if (response?.success) {
				setMessage(response.message || 'Event added successfully!')
				setFormData({
					title: '',
					date: '',
					location: '',
					type: '',
					description: '',
				})
			} else {
				setError('Failed to add event.')
			}
		} catch (error) {
			setError('Error adding event. Please try again.' + error.message)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className='max-w-md mx-auto'>
				{/* Title */}
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='text'
						name='title'
						id='title'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
						value={formData.title}
						onChange={handleChange}
					/>
					<label
						htmlFor='title'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Hackathon Title
					</label>
				</div>

				{/* Date */}
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='date'
						name='date'
						id='date'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
						value={formData.date}
						onChange={handleChange}
					/>
					<label
						htmlFor='date'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Date
					</label>
				</div>

				{/* Location */}
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='text'
						name='location'
						id='location'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
						value={formData.location}
						onChange={handleChange}
					/>
					<label
						htmlFor='location'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Location (City, Country)
					</label>
				</div>

				{/* Type */}
				<div className='relative z-0 w-full mb-5 group'>
					<select
						name='type'
						id='type'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						required
						value={formData.type}
						onChange={handleChange}
					>
						<option value='' disabled>
							Select Type
						</option>
						<option value='Beginner'>Beginner</option>
						<option value='Intermediate'>Intermediate</option>
						<option value='Advanced'>Advanced</option>
						<option value='Expert'>Expert</option>
					</select>
					<label
						htmlFor='type'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Type
					</label>
				</div>

				{/* Description */}
				<div className='relative z-0 w-full mb-5 group'>
					<textarea
						name='description'
						id='description'
						rows='4'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
						value={formData.description}
						onChange={handleChange}
					></textarea>
					<label
						htmlFor='description'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Description
					</label>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Submit
				</button>
			</form>

			{/* Success or Error message */}
			{message && (
				<p className='mt-4 text-green-500 font-semibold text-center'>
					{message}
				</p>
			)}
			{error && (
				<p className='mt-4 text-red-500 font-semibold text-center'>
					{error}
				</p>
			)}
		</div>
	)
}

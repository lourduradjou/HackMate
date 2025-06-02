import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import { signInAPI } from '../api' // adjust path if needed

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = await signInAPI(email, password)
			if (result.success && result.isAuthenticated) {
				// Save email to localStorage for later use
				localStorage.setItem('email', email)
				localStorage.setItem('role', result.role)
				navigate('/') // redirect to home
			} else {
				setError('Invalid email or password')
			}
		} catch (err) {
			console.error(err)
			setError('Something went wrong. Please try again.')
		}
	}

	return (
		<div className='flex h-screen justify-center items-center'>
			<form className='w-1/6 mx-auto' onSubmit={handleSubmit}>
				<div className='mb-5'>
					<label
						htmlFor='email'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Your email
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='name@flowbite.com'
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						htmlFor='password'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Your password
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
					/>
				</div>

				{error && (
					<div className='mb-4 text-red-600 text-sm'>{error}</div>
				)}

				<div className='flex space-x-4 w-full mx-auto'>
					<button
						type='submit'
						className='text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						Login
					</button>
					<Link to='/register'>
						<button
							type='button'
							className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
						>
							Register
						</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default LoginPage

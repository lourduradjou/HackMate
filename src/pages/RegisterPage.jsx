import React, { useState } from 'react'

import { signUpAPI } from '../api'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [skills, setSkills] = useState([])
	const [skillInput, setSkillInput] = useState('')
	const [education, setEducation] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleSkillKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			const trimmed = skillInput.trim()
			if (trimmed && !skills.includes(trimmed)) {
				setSkills([...skills, trimmed])
				setSkillInput('')
			}
		}
	}

	const removeSkill = (skillToRemove) => {
		setSkills(skills.filter((skill) => skill !== skillToRemove))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await signUpAPI(
				name,
				email,
				password,
				skills, // sending array here
				education
			)
			if (res.success) {
				setMessage('✅ Registered successfully!')
				localStorage.setItem('email', email)
				navigate('/')
			} else {
				setMessage('⚠️ Registration failed. Please try again.')
			}
		} catch (error) {
			console.error(error)
			setMessage('❌ Error occurred. Please check the console.')
		}
	}

	return (
		<div>
			<form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
				<div className='mb-5'>
					<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-100'>
						Your Name
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						required
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-100'>
						Your Email
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						required
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='skills' className='block mb-2 text-sm font-medium text-gray-100'>
						Your Skills (type & press Enter or ,)
					</label>
					<input
						type='text'
						id='skills'
						value={skillInput}
						onChange={(e) => setSkillInput(e.target.value)}
						onKeyDown={handleSkillKeyDown}
						className='border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						
					/>
					<div className='mt-2 flex flex-wrap gap-2'>
						{skills.map((skill) => (
							<span
								key={skill}
								className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center'
							>
								{skill}
								<button
									type='button'
									onClick={() => removeSkill(skill)}
									className='ml-1 text-red-500 hover:text-red-700'
								>
									&times;
								</button>
							</span>
						))}
					</div>
				</div>
				<div className='mb-5'>
					<label htmlFor='education' className='block mb-2 text-sm font-medium text-gray-100'>
						Your Highest Level Of Education
					</label>
					<input
						type='text'
						id='education'
						value={education}
						onChange={(e) => setEducation(e.target.value)}
						className='border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						
						required
					/>
				</div>
				<div className='mb-5'>
					<label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-100'>
						Your Password
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						required
					/>
				</div>

				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
				>
					Submit
				</button>
			</form>

			{message && <p className='mt-4 text-center text-sm'>{message}</p>}
		</div>
	)
}

export default RegisterPage

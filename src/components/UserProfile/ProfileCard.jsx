import React, { useEffect, useState } from 'react'

import { fetchProfileAPI } from '../../api' // adjust import path accordingly
import profileImage from '../../assets/images/profileImage.jpg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ProfileCard = () => {
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
  	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search)
		const emailFromQuery = queryParams.get('email')
		console.log(emailFromQuery)
		const email = emailFromQuery || localStorage.getItem('email')
		if (!email) {
			navigate('/login')
			return
		}
		const fetchProfile = async () => {
			try {
				if (!email) {
					setError('No email found in localStorage')
					setLoading(false)
					return
				}

				const data = await fetchProfileAPI(email)
				if (data.success) {
					setProfile(data)
				} else {
					setError('Failed to fetch profile')
				}
			} catch (error) {
				setError('Error fetching profile' + error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [location.search, navigate])

	if (loading) {
		return <div className='max-w-sm mx-auto p-4 text-white'>Loading profile...</div>
	}

	if (error) {
		return (
			<div className='max-w-sm mx-auto p-4 text-red-500'>
				Error: {error}
			</div>
		)
	}

	return (
		<div className='max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
			<img
				className='w-full h-48 object-cover'
				src={profileImage}
				alt='Profile'
			/>
			<div className='p-4'>
				<h2 className='text-2xl font-bold text-gray-800'>
					{profile.name}
				</h2>
				<p className='text-gray-600'>{profile.education}</p>
				<div>
					<h2 className='text-2xl font-bold text-gray-800'>Skills</h2>
					<p>{profile.skills.join(', ')}</p>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard

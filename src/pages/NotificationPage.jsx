import React, { useEffect, useState } from 'react'

import NotificationList from '../components/NotificationList'
import { getInvitations } from '../api' // or wherever your API call is
import axios from 'axios'

export default function NotificationsPage() {
	const [requests, setRequests] = useState([])
	const [sentRequests, setSentRequests] = useState([])

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (email) {
			getInvitations(email).then((data) => {
				if (data.success) {
					setRequests(data.requests)
				}
			})

			try{
				axios.get('http://localhost:8080/api/teammate/getRequests/'+email, {
				}).then((response) => {
					console.log(response.data)
					if (response.data.success) {
						setSentRequests(response.data.requests)
					}
				})
			}
			catch (error) {
				console.error('Error fetching sent requests:', error)
			}
		}
	}, [])

	return (
		<div className='min-h-screen bg-gray-900 text-white p-6'>
			<NotificationList requests={requests} sentRequests={sentRequests}/>
		</div>
	)
}

import React, { useEffect, useState } from 'react'

import NotificationList from '../components/NotificationList'
import { getInvitations } from '../api' // or wherever your API call is

export default function NotificationsPage() {
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (email) {
			getInvitations(email).then((data) => {
				if (data.success) {
					setRequests(data.requests)
				}
			})
		}
	}, [])

	return (
		<div className='min-h-screen bg-gray-900 text-white p-6'>
			<NotificationList requests={requests} />
		</div>
	)
}

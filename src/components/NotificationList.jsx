import React from 'react'

export default function NotificationList({ requests }) {
	return (
		<div className='p-4 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto mt-6'>
			<h2 className='text-xl font-semibold text-white mb-4'>
				Notifications
			</h2>
			{requests.length === 0 ? (
				<p className='text-gray-300'>No notifications.</p>
			) : (
				<ul className='space-y-3'>
					{requests.map((req) => (
						<li
							key={req.id}
							className='p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors'
						>
							<p className='text-gray-200'>
								<b>{req.requester}</b> has invited you.
							</p>
							{/* Optionally, add buttons for Accept / Decline */}
							{/* <div className='mt-2 flex gap-2'>
								<button className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm'>
									Accept
								</button>
								<button className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'>
									Decline
								</button>
							</div> */}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

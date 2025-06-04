import React from 'react'
import { Link } from 'react-router-dom'

export default function NotificationList({
	requests = [],
	sentRequests = [],
	onUpdateStatus,
}) {
	const handleAction = (id, status) => {
		if (!window.confirm(`Are you sure you want to mark as ${status}?`)) return

		fetch('http://localhost:8080/api/teammate/updateRequest', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, status }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					alert('Status updated!')
					window.location.reload() // Reload to reflect changes
					if (onUpdateStatus) onUpdateStatus(id, status)
				} else {
					alert('Failed to update status')
				}
			})
			.catch((err) => {
				console.error(err)
				alert('Error updating status')
			})
	}

	return (
		<div className='p-4 bg-gray-800 rounded-lg shadow-lg max-w-[700px] mx-auto mt-6 text-white'>
			{/* Incoming Invitations */}
<div className='mb-6'>
	<h2 className='text-xl font-semibold mb-4'>My Invitations</h2>
	{requests.length === 0 ? (
		<p className='text-gray-300'>No invitations received.</p>
	) : (
		<ul className='space-y-3'>
			{requests.map((req) => (
				<li
					key={req.id}
					className='p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors'
				>
					<p className='text-gray-200'>
						<b><Link to={`/profile?email=${req.requester}`}>{req.requesterName}</Link></b> has invited you.
					</p>

					{req.status === 'pending' ? (
						<div className='mt-2 flex gap-2'>
							<button
								onClick={() => handleAction(req.id, 'accepted')}
								className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm'
							>
								Accept
							</button>
							<button
								onClick={() => handleAction(req.id, 'rejected')}
								className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
							>
								Reject
							</button>
						</div>
					) : (
						<>
						<p
							className={`mt-2 text-sm font-semibold mb-2 ${
								req.status === 'accepted'
									? 'text-green-400'
									: 'text-red-400'
							}`}
						>
							You have {req.status}.
						</p>

						<a href={"mailto:"+req.requester} className='p-1  rounded-md bg-yellow-500 text-black'>contact</a> - {req.requester}
						</>
					)}
				</li>
			))}
		</ul>
	)}
</div>


			{/* Sent Requests */}
			<div>
				<h2 className='text-xl font-semibold mb-4'>Sent Requests</h2>
				{sentRequests.length === 0 ? (
					<p className='text-gray-300'>No sent requests.</p>
				) : (
					<ul className='space-y-3'>
						{sentRequests.map((req) => (
							<li
								key={req.id}
								className='p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors'
							>
								<p className='text-gray-200'>
									Request sent to <b><Link to={`/profile?email=${req.requestTo}`}>{req.requestToName}</Link></b> —{' '}
									<span
										className={`font-semibold ${
											req.status === 'accepted'
												? 'text-green-400'
												: req.status === 'rejected'
												? 'text-red-400'
												: 'text-yellow-400'
										}`}
									>
										{req.status || 'pending'}
									</span>
									{req.status === "accepted" && <a href={"mailto:"+req.requestTo} className='p-1 ml-5 rounded-md bg-yellow-500 text-black'>contact - {req.requester}</a> }
								</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

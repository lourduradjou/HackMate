import React, { useEffect, useState } from 'react'
import {
	fetchAllTeammatesAPI,
	getMyRequestsDetails,
	sendTeammateRequest,
} from '../api'

import { IoIosSend } from 'react-icons/io'
import Search from '../components/Search'
import { useNavigate } from 'react-router-dom'

const FindTeammatePage = () => {
	const [searchItem, setSearchItem] = useState('')
	const [teammates, setTeammates] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [sending, setSending] = useState({})
	const [successMessage, setSuccessMessage] = useState('')
	const [sentRequests, setSentRequests] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (!email) {
			navigate('/login')
			return
		}

		const fetchData = async () => {
			try {
				const [allTeammates, myRequests] = await Promise.all([
					fetchAllTeammatesAPI(),
					getMyRequestsDetails(email),
				])
				setTeammates(allTeammates)

				const alreadySent = myRequests?.requests?.map(
					(req) => req.requestTo
				)

				console.log(allTeammates)
				setSentRequests(alreadySent || [])
			} catch (err) {
				console.error(err)
				setError('❌ Failed to fetch data')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [navigate])

	const handleSendRequest = async (requestTo) => {
		const requester = localStorage.getItem('email')
		if (!requester) {
			alert('You must be logged in to send requests.')
			return
		}
		try {
			setSending((prev) => ({ ...prev, [requestTo]: true }))
			await sendTeammateRequest(requestTo, requester)
			setSuccessMessage(`✅ Request sent to ${requestTo}`)

			// Disable the button for this email by updating the sentRequests state
			setSentRequests((prev) => [...prev, requestTo])
		} catch (err) {
			console.error('Failed to send request', err)
			alert(`Failed to send request to ${requestTo}`)
		} finally {
			setSending((prev) => ({ ...prev, [requestTo]: false }))
		}
	}

	const filteredHackathonsEvents = searchItem
		? teammates.filter(
				(team) =>
					(team.skills.length > 0 &&
						team.email !== localStorage.getItem('email') &&
						team.name
							.toLowerCase()
							.includes(searchItem.toLowerCase())) ||
					team.education
						.toLowerCase()
						.includes(searchItem.toLowerCase()) ||
					team.skills.some((skill) =>
						skill.toLowerCase().includes(searchItem.toLowerCase())
					)
		  )
		: teammates.filter(
				(team) =>
					team.skills.length > 0 &&
					team.email !== localStorage.getItem('email')
		  )

	if (loading) {
		return (
			<p className='text-gray-200 text-center mt-10'>
				Loading teammates...
			</p>
		)
	}

	if (error) {
		return <p className=' text-center mt-10 text-red-500'>{error}</p>
	}

	return (
		<div>
			<Search searchItem={searchItem} setSearchItem={setSearchItem} />
			{successMessage && (
				<p className='text-green-500 text-center mt-4'>
					{successMessage}
				</p>
			)}
			<section className='mt-16'>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Name
								</th>
								{/* <th scope='col' className='px-6 py-3'>
									Email
								</th> */}
								<th scope='col' className='px-6 py-3'>
									Skills
								</th>
								<th scope='col' className='px-6 py-3'>
									Education
								</th>
								<th scope='col' className='px-6 py-3'>
									<span className='sr-only'>Request</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredHackathonsEvents.map((item, index) => {
								const alreadyRequested = sentRequests.includes(
									item.email
								)
								return (
									<tr
										key={index}
										className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
									>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
										>
											{item.name}
										</th>
										{/* <td className='px-6 py-4'>
											{item.email}
										</td> */}
										<td className='px-6 py-4'>
											<div className='flex flex-wrap gap-2'>
												{item.skills.map(
													(skill, idx) => (
														<span
															key={idx}
															className='px-2 py-1 bg-blue-200 rounded text-xs text-blue-800'
														>
															{skill}
														</span>
													)
												)}
											</div>
										</td>
										<td className='px-6 py-4'>
											{item.education}
										</td>
										<td className='px-6 py-4 text-right'>
											<button
												onClick={() =>
													handleSendRequest(
														item.email
													)
												}
												disabled={
													sending[item.email] ||
													alreadyRequested
												}
												className={`flex gap-2 items-center px-3 py-1 rounded ${
													sending[item.email] ||
													alreadyRequested
														? 'bg-gray-400 cursor-not-allowed'
														: 'bg-blue-600 hover:bg-blue-700 cursor-pointer text-white'
												}`}
											>
												<div>
													{alreadyRequested
														? 'Requested'
														: sending[item.email]
														? 'Sending...'
														: 'Show Interest'}
												</div>
												<IoIosSend size={20} />
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}

export default FindTeammatePage

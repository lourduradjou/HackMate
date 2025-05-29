import React, { useEffect, useState } from 'react'

import { IoIosSend } from 'react-icons/io'
import Search from '../components/Search'
import { fetchAllTeammatesAPI } from '../api' // adjust path as needed

const FindTeammatePage = () => {
	const [teammates, setTeammates] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchTeammates = async () => {
			try {
				const res = await fetchAllTeammatesAPI()
				setTeammates(res) // assuming res is the array of teammates
			} catch (err) {
				console.error(err)
				setError('❌ Failed to fetch teammates')
			} finally {
				setLoading(false)
			}
		}

		fetchTeammates()
	}, [])

	if (loading) {
		return <p className='text-center mt-10'>Loading teammates...</p>
	}

	if (error) {
		return <p className='text-center mt-10 text-red-500'>{error}</p>
	}

	return (
		<div>
			<Search />
			<section className='mt-16'>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Name
								</th>
								<th scope='col' className='px-6 py-3'>
									Email
								</th>
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
							{teammates.map((item, index) => (
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
									<td className='px-6 py-4'>{item.email}</td>
									<td className='px-6 py-4'>
										<div className='flex flex-wrap gap-2'>
											{item.skills.map((skill, idx) => (
												<span
													key={idx}
													className='px-2 py-1 bg-blue-200 rounded text-xs text-blue-800'
												>
													{skill}
												</span>
											))}
										</div>
									</td>
									<td className='px-6 py-4'>
										{item.education}
									</td>
									<td className='px-6 py-4 text-right'>
										<a
											href='#'
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<div className='flex gap-2 items-center'>
												<div>Request</div>
												<div>
													<IoIosSend size={24} />
												</div>
											</div>
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}

export default FindTeammatePage

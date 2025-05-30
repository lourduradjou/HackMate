import React, { useEffect, useState } from 'react'

import { IoIosSend } from 'react-icons/io'
import Search from '../components/Search'
import { fetchAllTeammatesAPI } from '../api' // adjust path as needed
import { useNavigate } from 'react-router-dom'

const FindTeammatePage = () => {
	const [searchItem, setSearchItem] = useState('')
	const [teammates, setTeammates] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (!email) {
			navigate('/login')
			return
		}
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

	const filteredHackathonsEvents = searchItem
		? teammates.filter(
				(team) =>
					team.name
						.toLowerCase()
						.includes(searchItem.toLowerCase()) ||
					team.education
						.toLowerCase()
						.includes(searchItem.toLowerCase()) ||
					team.skills.some((skill) =>
						skill.toLowerCase().includes(searchItem.toLowerCase())
					)
		  )
		: teammates

	if (loading) {
		return (
			<p className='text-gray-200 text-center mt-10'>
				Loading teammates...
			</p>
		)
	}

	if (error) {
		return (
			<p className='text-gray-200 text-center mt-10 text-red-500'>
				{error}
			</p>
		)
	}

	return (
		<div>
			<Search searchItem={searchItem} setSearchItem={setSearchItem} />
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
							{filteredHackathonsEvents.map((item, index) => (
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
											href={`mailto:${item.email}?subject=Hackathon%20Team%20Request&body=Hi%20${item.name},%0A%0AI%20came%20across%20your%20profile%20on%20HackMate%20and%20would%20love%20to%20team%20up%20for%20a%20hackathon!%0A%0AHere%27s%20a%20bit%20about%20me:%0A- Name:%20[Your%20Name]%0A- Skills:%20[Your%20Skills]%0A- Why%20I%27d%20like%20to%20collaborate:%20[Your%20Reason]%0A%0ALet%20me%20know%20if%20you%27re%20interested!%0A%0AThanks!`}
											className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
										>
											<button className='flex gap-2 items-center'>
												<div>Show Interest</div>
												<div>
													<IoIosSend size={24} />
												</div>
											</button>
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

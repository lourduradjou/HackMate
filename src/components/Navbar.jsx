import { FaCalendarAlt, FaSignInAlt, FaUsers } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { MdNotifications } from 'react-icons/md'
import { getInvitations } from '../api' // adjust the import path

export default function Navbar() {
	const location = useLocation()

	const [isLogged, setIsLogged] = useState(!!localStorage.getItem('email'))
	const [notificationCount, setNotificationCount] = useState(0)
	const role = localStorage.getItem('role')

	useEffect(() => {
		setIsLogged(!!localStorage.getItem('email'))

		const email = localStorage.getItem('email')
		if (email) {
			getInvitations(email)
				.then((data) => {
					setNotificationCount(data.requests.length)
				})
				.catch((err) => {
					console.error('Failed to fetch invitations:', err)
					setNotificationCount(0)
				})
		}
	}, [location])

	const navLinkClass = ({ isActive }) =>
		isActive
			? 'text-sky-400 font-bold cursor-pointer transition-colors '
			: 'text-gray-200 hover:text-white transition-colors cursor-pointer '

	return (
		<nav className='py-7 px-14'>
			<div className='flex justify-between items-center h-full'>
				<div>
					<h1 className='text-4xl font-bold tracking-wider'>
						<NavLink to='/' className={navLinkClass}>
							Hack<span className='text-sky-500'>Mate</span>
						</NavLink>
					</h1>
				</div>
				<div className='flex justify-center items-center tracking-widest'>
					<ul className='flex gap-12 text-normal mx-8'>
						{role !== 'host' && (
							<NavLink
								to='/myInvitations'
								className={navLinkClass}
							>
								<div className='relative flex items-center w-full h-full'>
									Notifications
									<MdNotifications
										className='ml-2'
										size={18}
									/>
									{/* {notificationCount} */}
									{notificationCount > 0 && (
										<span className='absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
											{notificationCount}
										</span>
									)}
								</div>
							</NavLink>
						)}
						<li>
							<NavLink to='/' className={navLinkClass}>
								<div className='flex items-center'>
									All Events
									<FaUsers className='ml-2 ' size={18} />
								</div>
							</NavLink>
						</li>
						{role !== 'host' ? (
							<>
								<li>
									<NavLink
										to='/teammate'
										className={navLinkClass}
									>
										<div className='flex items-center'>
											Find TeamMate
											<FaUsers
												className='ml-2 '
												size={18}
											/>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/myEvents'
										className={navLinkClass}
									>
										<div className='flex items-center'>
											My Events
											<FaUsers
												className='ml-2 '
												size={18}
											/>
										</div>
									</NavLink>
								</li>
							</>
						) : null}

						{role === 'host' && (
							<>
								<li>
									<NavLink
										to='/hostedEvents'
										className={navLinkClass}
									>
										<div className='flex items-center'>
											Hosted Events
											<FaCalendarAlt
												className='ml-2 '
												size={15}
											/>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/addEvents'
										className={navLinkClass}
									>
										<div className='flex items-center'>
											Host Events
											<FaCalendarAlt
												className='ml-2 '
												size={15}
											/>
										</div>
									</NavLink>
								</li>
							</>
						)}

						<li>
							{isLogged ? (
								<NavLink to='/login' className={navLinkClass}>
									<button
										className='flex items-center text-red-500 cursor-pointer'
										onClick={() => {
											localStorage.removeItem('email')
											setIsLogged(false)
										}}
									>
										Logout
									</button>
								</NavLink>
							) : (
								<NavLink to='/login' className={navLinkClass}>
									<div className='flex items-center'>
										Login
										<FaSignInAlt
											className='ml-2 '
											size={18}
										/>
									</div>
								</NavLink>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

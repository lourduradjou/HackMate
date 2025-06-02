import {
	FaCalendarAlt,
	FaSignInAlt,
	FaUserCircle,
	FaUsers,
} from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
	const location = useLocation()

	const [isLogged, setIsLogged] = useState(!!localStorage.getItem('email'))
	const role = localStorage.getItem('role')

	useEffect(() => {
		// Recheck on every route change
		setIsLogged(!!localStorage.getItem('email'))
	}, [location])

	const navLinkClass = ({ isActive }) =>
		isActive
			? 'text-sky-400 font-bold'
			: 'text-gray-200 hover:text-white transition-colors'

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
						) : (
							''
						)}

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
						{/* {role !== 'host' ? (
							<li>
								<NavLink to='/profile' className={navLinkClass}>
									<div className='flex items-center'>
										Profile
										<FaUserCircle
											className='ml-2 '
											size={18}
										/>
									</div>
								</NavLink>
							</li>
						) : (
							''
						)} */}

						<li>
							{isLogged ? (
								<NavLink to='/login' className={navLinkClass}>
									<button
										className='flex items-center text-red-500'
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

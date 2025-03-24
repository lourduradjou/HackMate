import React from 'react'
import {
	FaUsers,
	FaCalendarAlt,
	FaUserCircle,
	FaSignInAlt,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<nav className='py-7 px-14'>
			<div className='flex justify-between items-center h-full text-white'>
				<div>
					<h1 className='text-4xl font-bold tracking-wider'>
						<Link to='/'>
							Hack<span className='text-sky-500'>Mate</span>
						</Link>
					</h1>
				</div>
				<div className='flex justify-center items-center tracking-widest'>
					<ul className='flex gap-12 text-normal mx-8'>
						<li>
							<Link to='/' className='underLight'>
								<div className='flex items-center'>
									Find TeamMate{' '}
									<FaUsers className='ml-2 ' size={18} />
								</div>
							</Link>
						</li>
						<li>
							<Link to='/addEvents' className='underLight'>
								<div className='flex items-center'>
									Host Events
									<FaCalendarAlt
										className='ml-2 '
										size={15}
									/>
								</div>
							</Link>
						</li>
						<li>
							<Link to='profile' className='underLight'>
								<div className='flex items-center'>
									Profile
									<FaUserCircle className='ml-2 ' size={18} />
								</div>
							</Link>
						</li>
						<li>
							<a href='' className='underLight'>
								<div className='flex items-center'>
									Login
									<FaSignInAlt className='ml-2 ' size={18} />
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

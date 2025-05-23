import React from 'react'

export default function Footer() {
	return (
		<footer class='bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800 mt-[100px]'>
			<div className='flex justify-between items-center px-14 py-7'>
				<div>
					<span class='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						HackMate
					</span>
				</div>
				<div>
					<ul class='flex gap-5 mx-8 text-white'>
						<li>
							<a href='#' class='hover:underline me-4 md:me-6'>
								About
							</a>
						</li>
						<li>
							<a href='#' class='hover:underline me-4 md:me-6'>
								Privacy Policy
							</a>
						</li>
						<li>
							<a href='#' class='hover:underline me-4 md:me-6'>
								Licensing
							</a>
						</li>
						<li>
							<a href='#' class='hover:underline'>
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

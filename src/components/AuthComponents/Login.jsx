import React from 'react'

export default function Login() {
	return (
		<div>
			<section class=''>
				<div class='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16'>
					<div class='flex flex-col justify-center'>
						<h1 class='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
							We invest in the world’s potential
						</h1>
						<p class='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
							Here at Flowbite we focus on markets where
							technology, innovation, and capital can unlock
							long-term value and drive economic growth.
						</p>
						<a
							href='#'
							class='text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center'
						>
							Read more about our app
							<svg
								class='w-3.5 h-3.5 ms-2 rtl:rotate-180'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 10'
							>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M1 5h12m0 0L9 1m4 4L9 9'
								/>
							</svg>
						</a>
					</div>
					<div>
						<div class='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800'>
							<h2 class='text-2xl font-bold text-gray-900 dark:text-white'>
								Sign in to Flowbite
							</h2>
							<form class='mt-8 space-y-6' action='#'>
								<div>
									<label
										for='email'
										class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Your email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
										required
									/>
								</div>
								<div>
									<label
										for='password'
										class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Your password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required
									/>
								</div>
								<div class='flex items-start'>
									<div class='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											name='remember'
											type='checkbox'
											class='w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
											required
										/>
									</div>
									<div class='ms-3 text-sm'>
										<label
											for='remember'
											class='font-medium text-gray-500 dark:text-gray-400'
										>
											Remember this device
										</label>
									</div>
									<a
										href='#'
										class='ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
									>
										Lost Password?
									</a>
								</div>
								<button
									type='submit'
									class='w-full px-5 py-3 cursor-pointer text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								>
									Login to your account
								</button>
								<div class='text-sm font-medium text-gray-900 dark:text-white'>
									Not registered yet?{' '}
									<a class='text-blue-600 hover:underline dark:text-blue-500'>
										Create account
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

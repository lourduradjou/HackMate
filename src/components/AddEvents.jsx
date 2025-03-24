import React from 'react'

export default function AddEvents() {
	return (
		<div>
			<form class='max-w-md mx-auto'>
				{/* <!-- Title --> */}
				<div class='relative z-0 w-full mb-5 group'>
					<input
						type='text'
						name='title'
						id='title'
						class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
					/>
					<label
						for='title'
						class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Hackathon Title
					</label>
				</div>

				{/* <!-- Date --> */}
				<div class='relative z-0 w-full mb-5 group'>
					<input
						type='date'
						name='date'
						id='date'
						class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
					/>
					<label
						for='date'
						class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Date
					</label>
				</div>

				{/* <!-- Location --> */}
				<div class='relative z-0 w-full mb-5 group'>
					<input
						type='text'
						name='location'
						id='location'
						class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
					/>
					<label
						for='location'
						class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Location (City, Country)
					</label>
				</div>

				{/* <!-- Type --> */}
				<div class='relative z-0 w-full mb-5 group'>
					<select
						name='type'
						id='type'
						class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						required
					>
						<option value='' disabled selected>
							Select Type
						</option>
						<option value='Beginner'>Beginner</option>
						<option value='Intermediate'>Intermediate</option>
						<option value='Advanced'>Advanced</option>
						<option value='Expert'>Expert</option>
					</select>
					<label
						for='type'
						class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Type
					</label>
				</div>

				{/* <!-- Description --> */}
				<div class='relative z-0 w-full mb-5 group'>
					<textarea
						name='description'
						id='description'
						rows='4'
						class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=' '
						required
					></textarea>
					<label
						for='description'
						class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Description
					</label>
				</div>

				{/* <!-- Submit Button --> */}
				<button
					type='submit'
					class='min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Submit
				</button>
			</form>
		</div>
	)
}

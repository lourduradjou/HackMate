import { IoIosSend } from 'react-icons/io'
import Search from '../components/Search'
import { Send } from 'lucide'

const data = [
	{
		name: 'Baalaji',
		age: 20,
		skills: ['Java', 'SpringBoot', 'DSA', 'CyberSecurity'],
		education: 'B.tech - CSE',
	},
    {
		name: 'Lourdu',
		age: 20,
		skills: ['Java', 'SpringBoot', 'DSA', 'CyberSecurity'],
		education: 'B.tech - CSE',
	},
    {
		name: 'Arun',
		age: 20,
		skills: ['Java', 'SpringBoot', 'DSA', 'CyberSecurity'],
		education: 'B.tech - CSE',
	},
     {
		name: 'Bharat',
		age: 20,
		skills: ['Java', 'SpringBoot', 'DSA', 'CyberSecurity'],
		education: 'B.tech - CSE',
	},
     {
		name: 'Loks',
		age: 20,
		skills: ['Java', 'SpringBoot', 'DSA', 'CyberSecurity'],
		education: 'B.tech - CSE',
	},
]
const FindTeammatePage = () => {
	return (
		<div>
			<Search />
			{/* this section showcase the players after filtering via the search bar */}
			{/* Initially it will show all existing peoples */}
			<section className='mt-16'>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Name
								</th>
								<th scope='col' className='px-6 py-3'>
									Age
								</th>
								<th scope='col' className='px-6 py-3'>
									Skills
								</th>
								<th scope='col' className='px-6 py-3'>
									Education
								</th>
								<th scope='col' className='px-6 py-3'>
									<span className='sr-only'>Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
									<th
										scope='row'
										class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
										{item.name}
									</th>
									<td class='px-6 py-4'>{item.age}</td>
									<td class='px-6 py-4'>
										<div className='flex space-x-2'>
											{item.skills.map((skill) => (
												<p>{skill}</p>
											))}
										</div>
									</td>
									<td class='px-6 py-4'>{item.education}</td>
									<td class='px-6 py-4 text-right'>
										<a
											href='#'
											class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
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

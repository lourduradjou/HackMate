import React, { useEffect, useState, useTransition } from 'react'
import HackCard from './HackCard'
import Search from './Search'

export default function HackathonLists() {
	const [searchItem, setSearchItem] = useState('')
	const [hackEvents, setHackEvents] = useState([
		{
			title: 'CodeFusion 2025',
			date: '04/15/2025',
			location: 'San Francisco, CA',
			type: 'Intermediate',
			description:
				'A hackathon focused on building innovative FinTech solutions, including payment gateways and fraud detection models.',
		},
		{
			title: 'AI Innovators Challenge',
			date: '05/10/2025',
			location: 'Online',
			type: 'Advanced',
			description:
				'An AI-focused hackathon where participants create solutions using machine learning and deep learning models to solve real-world problems.',
		},
		{
			title: 'GreenTech Hack',
			date: '06/20/2025',
			location: 'Berlin, Germany',
			type: 'Beginner',
			description:
				'An event promoting sustainability, where hackers create eco-friendly solutions, such as energy management systems and smart recycling apps.',
		},
		{
			title: 'HealthTech Sprint',
			date: '07/05/2025',
			location: 'Bangalore, India',
			type: 'Intermediate',
			description:
				'A healthcare-themed hackathon where teams build applications for telemedicine, patient monitoring, and health data analysis.',
		},
		{
			title: 'CyberDefenders',
			date: '08/12/2025',
			location: 'Online',
			type: 'Expert',
			description:
				'A cybersecurity competition where participants develop and defend systems against simulated attacks, testing their security skills.',
		},
		{
			title: 'Future of Mobility Hack',
			date: '09/18/2025',
			location: 'Tokyo, Japan',
			type: 'Intermediate',
			description:
				'A mobility-focused hackathon exploring autonomous vehicles, smart transportation, and route optimization solutions.',
		},
	])

	// Function to add new event
	const addEvent = (newEvent) => {
		setHackEvents((prevEvents) => [...prevEvents, newEvent])
	}

	const filteredHackathonsEvents = searchItem
		? hackEvents.filter(
				(hack) =>
					hack.title
						.toLowerCase()
						.includes(searchItem.toLowerCase()) ||
					hack.location
						.toLowerCase()
						.includes(searchItem.toLowerCase()) ||
					hack.type.toLowerCase().includes(searchItem.toLowerCase())
		  )
		: hackEvents

	return (
		<div className='text-white'>
			<Search searchItem={searchItem} setSearchItem={setSearchItem} />

			<h1 className='font-bold text-2xl text-center my-6 bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent'>
				Hackathon Lists
			</h1>
			<div className='flex flex-wrap gap-8 justify-center'>
				{filteredHackathonsEvents.map((event, index) => (
					<HackCard
						key={index}
						title={event.title}
						date={event.date}
						location={event.location}
						description={event.description}
						type={event.type}
					/>
				))}
			</div>
		</div>
	)
}

import React, { useEffect, useState } from 'react'

import HackCard from './HackCard'
import Search from './Search'
import { fetchAllEventsAPI } from '../api' // adjust the import path if needed
import { useNavigate } from 'react-router-dom'

export default function HackathonLists() {
  const [searchItem, setSearchItem] = useState('')
  const [hackEvents, setHackEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    // Check for email in localStorage; if missing, redirect to login
    const email = localStorage.getItem('email')
    if (!email) {
      navigate('/login')
      return
    }

    const fetchEvents = async () => {
      try {
        const res = await fetchAllEventsAPI()
        if (res.success) {
          setHackEvents(res.events)
        } else {
          setError('⚠️ Failed to load events')
        }
      } catch (err) {
        console.error(err)
        setError('❌ Error fetching events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [navigate])

  const filteredHackathonsEvents = searchItem
    ? hackEvents.filter(
        (hack) =>
          hack.eventName.toLowerCase().includes(searchItem.toLowerCase()) ||
          hack.location.toLowerCase().includes(searchItem.toLowerCase()) ||
          hack.eventType.toLowerCase().includes(searchItem.toLowerCase())
      )
    : hackEvents

  if (loading) {
    return <p className='text-center mt-10'>Loading hackathons...</p>
  }

  if (error) {
    return <p className='text-center mt-10 text-red-500'>{error}</p>
  }

  return (
    <div className='text-white'>
      <Search searchItem={searchItem} setSearchItem={setSearchItem} />

      <h1 className='font-bold text-2xl text-center my-6 bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent'>
        Hackathon Lists
      </h1>
      {filteredHackathonsEvents.length === 0 ? (
        <p className='text-center'>No hackathons found.</p>
      ) : (
        <div className='flex flex-wrap gap-8 justify-center'>
          {filteredHackathonsEvents.map((event) => (
            <HackCard
              key={event.id}
              id={event.id}
              title={event.eventName}
              date={event.date}
              location={event.location}
              description={event.description}
              type={event.eventType}
            />
          ))}
        </div>
      )}
    </div>
  )
}

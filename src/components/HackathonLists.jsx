import React, { useEffect, useState } from 'react'
import HackCard from './HackCard'
import Search from './Search'
import { fetchAllEventsAPI, fetchMyEvents } from '../api'
import { useNavigate } from 'react-router-dom'

export default function HackathonLists() {
  const [searchItem, setSearchItem] = useState('')
  const [hackEvents, setHackEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [registeredEvents, setRegisteredEvents] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email')
      if (!email) {
        navigate('/login')
        return
      }

      try {
        const myEventsRes = await fetchMyEvents({ email })
        setRegisteredEvents(myEventsRes) // Expected to be an array of registered event objects
      } catch (err) {
        console.error(err)
      }

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

    fetchData()
  }, [navigate])

  const filteredHackathonsEvents = searchItem
    ? hackEvents.filter(
        (hack) =>
          hack.eventName.toLowerCase().includes(searchItem.toLowerCase()) ||
          hack.location.toLowerCase().includes(searchItem.toLowerCase()) ||
          hack.eventType.toLowerCase().includes(searchItem.toLowerCase())
      )
    : hackEvents

  function isRegistered(eventId) {
    return registeredEvents.some((item) => item.event.id === eventId)
  }

  if (loading) {
    return <p className='text-gray-200 text-center mt-10'>Loading hackathons...</p>
  }

  if (error) {
    return <p className='text-red-500 text-center mt-10'>{error}</p>
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
              teamSize={event.maxTeamSize}
              isRegistered={isRegistered(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

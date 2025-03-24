import React from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HostEvents from './pages/HostEvents'
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
// import Login from './components/AuthComponents/Login'

export default function App() {
	return (
		<div className='min-h-screen bg-[#212529] pb-10'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/addEvents' element={<HostEvents />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
			<Footer />
		</div>
	)
}

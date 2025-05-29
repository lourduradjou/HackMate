import './App.css'

import { Route, Routes } from 'react-router-dom'

import EventDetailPage from './pages/EventDetailPage'
import FindTeammatePage from './pages/FindTeammatePage'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import HostEvents from './pages/HostEvents'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'

// import Login from './components/AuthComponents/Login'

export default function App() {
	return (
		<div className='min-h-screen bg-[#212529] pb-10'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/addEvents' element={<HostEvents />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/teammate' element={<FindTeammatePage />} />
				<Route path='/events/:id' element={<EventDetailPage />} />
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}

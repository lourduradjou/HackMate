import './App.css'

import { Route, Routes } from 'react-router-dom'

import EventDetailPage from './pages/EventDetailPage'
import FindTeammatePage from './pages/FindTeammatePage'
import Homepage from './pages/Homepage'
import HostEvents from './pages/HostEvents'
import HostedEventsPage from './pages/HostedEvents'
import LoginPage from './pages/LoginPage'
import MyEvents from './pages/MyEvents'
import Navbar from './components/Navbar'
import NotificationsPage from './pages/NotificationPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'

// import Login from './components/AuthComponents/Login'

export default function App() {
	return (
		<div className='min-h-screen bg-[#212529] pb-10'>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Navbar />
							<Homepage />
						</>
					}
				/>
				<Route
					path='/hostedEvents'
					element={
						<>
							<Navbar />
							<HostedEventsPage />
						</>
					}
				/>
				<Route
					path='/myEvents'
					element={
						<>
							<Navbar />
							<MyEvents />
						</>
					}
				/>
				<Route
					path='/addEvents'
					element={
						<>
							<Navbar />
							<HostEvents />
						</>
					}
				/>
				<Route
					path='/profile'
					element={
						<>
							<Navbar />
							<ProfilePage />
						</>
					}
				/>
				<Route
					path='/login'
					element={
						<>
							<LoginPage />
						</>
					}
				/>
				<Route
					path='/register'
					element={
						<>
							<RegisterPage />
						</>
					}
				/>
				<Route
					path='/teammate'
					element={
						<>
							<Navbar />
							<FindTeammatePage />
						</>
					}
				/>
				<Route
					path='/events/:id'
					element={
						<>
							<Navbar />
							<EventDetailPage />
						</>
					}
				/>

				<Route
					path='/myInvitations'
					element={
						<>
							<Navbar />
							<NotificationsPage />
						</>
					}
				/>
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}

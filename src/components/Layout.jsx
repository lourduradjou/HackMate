import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ Component }) {
	return (
		<div>
			<Navbar />
			{Component}
			<Footer />
		</div>
	)
}

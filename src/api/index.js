import axios from 'axios'

const URL_1 = 'http://localhost:8080'
const URL_2 = 'http://localhost:8081'

//users api
//signin for user
export async function signInAPI(email, password) {
	const res = await axios.post(URL_1 + '/api/signin', { email, password })
	return res.data
}

export async function signUpAPI(
	name,
	email,
	password,
	skills,
	education,
	role
) {
	const res = await axios.post(URL_1 + '/api/signup', {
		name,
		email,
		password,
		skills,
		education,
		role,
	})
	return res.data
}

// profile fetch api via email
export async function fetchProfileAPI(email) {
	const res = await axios.get(`${URL_1}/api/profile`, {
		params: { email },
	})
	return res.data
}

export async function fetchAllTeammatesAPI() {
	const res = await axios.get(`${URL_1}/api/teammates`)
	return res.data
}

// ----------------------------------------------------------
// api related to the second url for event managements

// fetch all events api
export async function fetchAllEventsAPI() {
	const res = await axios.get(`${URL_2}/api/viewEvents`)
	return res.data
}

// fetch all events api hosted by a person via email
export async function fetchAllEventsHostedAPI(email) {
	const res = await axios.get(`${URL_2}/api/viewEvents/` + email)
	return res.data
}

// add event api
export async function addEventAPI(
	eventName,
	date,
	location,
	eventType,
	description,
	hostedBy
) {
	const res = await axios.post(URL_2 + '/api/addEvent', {
		eventName,
		date,
		location,
		eventType,
		description,
		hostedBy,
	})
	return res.data
}

// remove an event
export async function removeEventAPI(eventId) {
	const res = await axios.delete(`${URL_2}/api/removeEvent`, {
		params: { eventId },
	})
	return res.data
}

// update an event
export async function updateEventAPI(
	eventId,
	eventName,
	date,
	location,
	eventType,
	description
) {
	const res = await axios.put(URL_2 + '/api/updateEvent', {
		eventId,
		eventName,
		date,
		location,
		eventType,
		description,
	})
	return res.data
}

//register events
export async function registerEventAPI(eventId, email) {
	const res = await axios.post(`${URL_2}/api/registrations`, {
		eventId,
		email,
	})
	if (res.status !== 200) {
		throw new Error(res.data.message || 'Registration failed')
	}
	return res.data
}

// fetch events user registered to
export async function fetchMyEvents(email) {
	const res = await axios.get(`${URL_2}/api/registrations`, {
		params: email,
	})
	return res.data
}

// cancel a registered event
export async function cancelEvent(eventId, email) {
	const res = await axios.delete(`${URL_2}/api/registrations`, {
		params: {
			email: email,
			eventId: eventId,
		},
	})
	return res.data
}

// -------------------------------------------------------------
// send teammate requests api
export async function sendTeammateRequest(requestTo, requester) {
	const res = await axios.post(`${URL_1}/api/teammate/sendRequest`, {
		requestTo : requestTo,
		requester : requester,
	})
	return res.data
}

// get invitations in the beginning

export async function getInvitations(email) {
	const res = await axios.post(`${URL_1}/api/teammate/invitations/` + email)
	return res.data
}

// requests that i gave and its status
export async function getMyRequestsDetails(email) {
	const res = await axios.post(`${URL_1}/api/teammate/getRequests/` + email)
	return res.data
}

import { authHeader } from '../_helpers/authHeader'
import {API_BASE} from '../../config'

export const messageService = {
	getConvos,
	initiateConvo,
	getHistory,
}

function getConvos() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`http://${API_BASE}/message/`, requestOptions).then(
		handleResponse
	)
}

function initiateConvo(userid, message) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ participants: [userid], message: message }),
	}

	return fetch(`http://${API_BASE}/message/`, requestOptions).then(
		handleResponse
	)
}

function getHistory(convoId) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`http://${API_BASE}/message/${convoId}`, requestOptions).then(
		handleResponse
	)
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}

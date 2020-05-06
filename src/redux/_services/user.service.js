import { history } from '../_helpers/history'
import { authHeader } from '../_helpers/authHeader'

export const userService = {
	login,
	logout,
	register,
	list,
	delete: _delete,
	unlock,
}

var API_BASE

if (process.env.NODE_ENV === 'development') {
	API_BASE = 'localhost:3001'
}

if (process.env.NODE_ENV === 'production') {
	API_BASE = 'core:3001'
}

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	}

	return fetch(`http://${API_BASE}/user/login`, requestOptions)
		.then(handleResponse)
		.then(data => {
			localStorage.setItem('user', JSON.stringify(data.user))
			localStorage.setItem('token', data.token)

			//history.push("/");

			return data.user
		})
}

function logout() {
	localStorage.removeItem('user')
	localStorage.removeItem('token')

	history.push('/login')
}

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	}

	return fetch(`https://${API_BASE}/user/signup`, requestOptions).then(
		handleResponse
	)
}

// ADMIN USER ACTIONS
function unlock(username) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(
		`https://${API_BASE}/user/unlock/${username}`,
		requestOptions
	).then(handleResponse)
}

function list() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`https://${API_BASE}/user/`, requestOptions).then(handleResponse)
}

function _delete(username) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`https://${API_BASE}/user/${username}`, requestOptions).then(
		handleResponse
	)
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			if (response.status >= 400) {
				logout()
				window.location.reload(true)
			}

			const error = (data && data.payload.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}

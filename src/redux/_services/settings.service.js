import { authHeader } from '../_helpers/authHeader'
import * as axios from 'axios'

export const settingsService = {
	uploadAvatar,
}

const API_BASE = process.env.API_BASE || 'localhost:3001'

function uploadAvatar(file, username) {
	let data = new FormData()
	data.append('avatar', file)

	return axios({
		method: 'post',
		url: `http://${API_BASE}/user/${username}`,
		headers: authHeader({ 'Content-Type': 'multipart/form-data' }),
		data: data,
	})
		.then(handleAxiosResponse)
		.then(user => {
			localStorage.setItem('user', JSON.stringify(user))
			return user.avatar
		})
}

// function handleResponse(response) {
// 	return response.text().then(text => {
// 		const data = text && JSON.parse(text)
// 		if (!response.ok) {
// 			const error = (data && data.message) || response.statusText
// 			return Promise.reject(error)
// 		}

// 		return data
// 	})
// }

function handleAxiosResponse(response) {
	if (response.status >= 300)
		return Promise.reject(
			(response.data && response.data.message) || response.statusText
		)
	return response.data.user
}

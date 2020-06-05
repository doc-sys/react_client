import { authHeader } from '../_helpers/authHeader'
import * as axios from 'axios'

export const documentService = {
	getOwn,
	getShared,
	getSingle,
	delete: _delete,
	share,
	checkout,
	upload,
	addComment,
	archive,
	queueKey,
	queueOCR,
}

function getOwn() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`/api/document/own`, requestOptions).then(
		handleResponse
	)
}

function getShared() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`/api/document/shared`, requestOptions).then(
		handleResponse
	)
}

function getSingle(fileid) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`/api/document/${fileid}`, requestOptions).then(
		handleResponse
	)
}

function _delete(fileid) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader({ 'Content-Type': 'application/json' }),
	}

	return fetch(`/api/document/${fileid}`, requestOptions).then(
		handleResponse
	)
}

function share(fileid, whom) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ whoToShare: whom }),
	}

	return fetch(
		`/api/document/share/${fileid}`,
		requestOptions
	).then(handleResponse)
}

function addComment(fileid, comment) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ comment: comment }),
	}

	return fetch(
		`/api/document/comment/${fileid}`,
		requestOptions
	).then(handleResponse)
}

function checkout(fileId) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	}

	return fetch(
		`/api/document/checkout/${fileId}`,
		requestOptions
	).then(handleDownloadResponse)
}

function upload(formData) {
	return axios({
		method: 'post',
		url: `/api/document/`,
		headers: authHeader({ 'Content-Type': 'multipart/form-data' }),
		data: formData,
	}).then(handleAxiosResponse)
}

function archive(fileId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	}

	return fetch(
		`/api/document/archive/${fileId}`,
		requestOptions
	).then(handleResponse)
}

function queueOCR(fileId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	}

	return fetch(
		`/api/document/queue/ocr/${fileId}`,
		requestOptions
	).then(handleResponse)
}

function queueKey(fileId) {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
	}

	return fetch(
		`/api/document/queue/key/${fileId}`,
		requestOptions
	).then(handleResponse)
}

function handleDownloadResponse(response) {
	return response.blob().then(blob => {
		if (!response.ok) {
			const error = response.statusText || 'Something went wrong'
			return Promise.reject(error)
		}

		let link = document.createElement('a')
		link.href = window.URL.createObjectURL(blob)

		document.body.appendChild(link)
		link.click()

		document.body.removeChild(link)
	})
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

function handleAxiosResponse(response) {
	if (response.status >= 300)
		return Promise.reject(
			(response.data && response.data.message) || response.statusText
		)
	return response.data
}

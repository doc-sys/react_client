import { alertConstants } from '../_constants/alert.constants'

export const alertActions = {
	success,
	error,
	clear,
	clearNotifications,
}

function success(message) {
	return { type: alertConstants.SUCCESS, message }
}

function error(message) {
	return { type: alertConstants.ERROR, message }
}

function clear() {
	return { type: alertConstants.CLEAR }
}
function clearNotifications() {
	return { type: alertConstants.NOTIFICATION_CLEAR }
}

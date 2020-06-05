import { alertConstants } from '../_constants/alert.constants'

export function alert(state = { notification: {} }, action) {
	switch (action.type) {
		case alertConstants.SUCCESS:
			return {
				...state,
				type: 'alert-success',
				message: action.message,
			}
		case alertConstants.ERROR:
			return {
				...state,
				type: 'alert-danger',
				message: action.message,
			}
		case alertConstants.NOTIFICATION:
			return {
				...state,
				notification: {
					type: 'alert-notification',
					message: action.message.text,
					link: action.message.link,
				},
			}
		case alertConstants.CLEAR:
			return {
				notification: state.notification,
			}
		case alertConstants.NOTIFICATION_CLEAR:
			return {
				...state,
				notification: {},
			}
		default:
			return state
	}
}

import { messageConstants } from '../_constants/message.constants'
import { messageService } from '../_services/message.service'

import { alertActions } from '../_actions/alert.actions'

export const messageActions = {
	getConvos,
	initiateConvo,
	getHistory,
}

function getConvos() {
	return dispatch => {
		dispatch(request())

		messageService.getConvos().then(
			convos => {
				dispatch(success(convos))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: messageConstants.GET_CONVERSATIONS_REQUEST }
	}
	function success(messages) {
		return { type: messageConstants.GET_CONVERSATIONS_SUCCESS, payload: messages }
	}
	function failure(error) {
		return { type: messageConstants.GET_CONVERSATIONS_FAILURE, error }
	}
}

function initiateConvo(userid, message) {
	return dispatch => {
		dispatch(request())

		messageService.initiateConvo(userid, message).then(
			convo => {
				dispatch(success(convo))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: messageConstants.INITIATE_CONVERSATION_REQUEST }
	}
	function success(convoId) {
		return {
			type: messageConstants.INITIATE_CONVERSATION_SUCCESS,
			payload: convoId,
		}
	}
	function failure(error) {
		return { type: messageConstants.INITIATE_CONVERSATION_FAILURE, error }
	}
}

function getHistory(convoId) {
	return dispatch => {
		dispatch(request())

		messageService.getHistory(convoId).then(
			convoHistory => {
				dispatch(success(convoHistory))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: messageConstants.GET_HISTORY_REQUEST }
	}
	function success(convoHistory) {
		return {
			type: messageConstants.GET_HISTORY_SUCCESS,
			payload: convoHistory,
		}
	}
	function failure(error) {
		return { type: messageConstants.GET_HISTORY_FAILURE, error }
	}
}

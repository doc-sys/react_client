import { messageConstants } from '../_constants/message.constants'

export function message(state = [], action) {
	switch (action.type) {
		case messageConstants.INITIATE_CONVERSATION_REQUEST:
			return state
		case messageConstants.INITIATE_CONVERSATION_FAILURE:
			return state
		case messageConstants.INITIATE_CONVERSATION_SUCCESS:
			state = state.concat([action.payload])
			return state

		case messageConstants.GET_CONVERSATIONS_REQUEST:
			return state
		case messageConstants.GET_CONVERSATIONS_FAILURE:
			return state
		case messageConstants.GET_CONVERSATIONS_SUCCESS:
			return action.payload

		case messageConstants.GET_HISTORY_REQUEST:
			return state
		case messageConstants.GET_HISTORY_SUCCESS:
			let convo = state.findIndex(el => el.convoId === action.payload[0].convoId)
			state[convo].messages = action.payload[0].messages
			return state
		case messageConstants.GET_HISTORY_FAILURE:
			return state

		case messageConstants.SEND_NEW_MESSAGE:
			convo = state.findIndex(el => el.convoId === action.payload.convoId)
			state[convo].messages.push(action.payload.messages)
			return state
		case messageConstants.GET_NEW_MESSAGE:
			convo = state.findIndex(el => el.convoId === action.payload.convoId)
			state[convo].messages.push(action.payload.messages)
			return state

		default:
			return state
	}
}

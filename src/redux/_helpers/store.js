import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as io from 'socket.io-client'

import rootReducer from '../_reducers/rootReducer'
//import { messageActions } from '../_actions/message.actions'
import { messageConstants } from '../_constants/message.constants'

const logger = createLogger()

const createSocketMiddleware = ({ getState, dispatch }) => {
	let socket = io.connect(process.env.API_BASE || 'localhost:3001')

	socket.on('message', message => {
		dispatch({
			type: messageConstants.GET_NEW_MESSAGE,
			payload: message,
		})
	})

	return next => action => {
		if (action.type === messageConstants.SEND_NEW_MESSAGE) {
			socket.send(action.payload)
			return
		}

		return next(action)
	}
}

export const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, createSocketMiddleware, logger)
)

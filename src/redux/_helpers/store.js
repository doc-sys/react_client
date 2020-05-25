import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../_reducers/rootReducer'
//import { messageActions } from '../_actions/message.actions'
import { messageConstants } from '../_constants/message.constants'
import { alertConstants } from '../_constants/alert.constants'

import {API_BASE} from '../../config'

import * as io from 'socket.io-client'
import UIfx from 'uifx'

import notify from './notification.mp3'
const notification = new UIfx(notify, { volume: 1 })

const logger = createLogger()

const createSocketMiddleware = ({ getState, dispatch }) => {
	let token = localStorage.getItem('token')

	let socket = io.connect(
		`http://${API_BASE}?token=${token}&username=flexwie`
	)
	let notification_recp = io(
		`http://${API_BASE}/notifications?token=${token}&username=flexwie`
	)

	socket.on('message', message => {
		dispatch({
			type: messageConstants.GET_NEW_MESSAGE,
			payload: message,
		})
	})

	notification_recp.on('notification', message => {
		notification.play()
		dispatch({
			type: alertConstants.NOTIFICATION,
			message: message,
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
	applyMiddleware(createSocketMiddleware, thunkMiddleware, logger)
)

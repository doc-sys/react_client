import { userConstants } from '../_constants/user.constants'

export function users(state = [], action) {
	switch (action.type) {
		case userConstants.GET_ALL_REQUEST:
			return [...state]
		case userConstants.GET_ALL_SUCCESS:
			return [...action.user.user]
		case userConstants.GET_ALL_FAILURE:
			return []

		case userConstants.DELETE_ONE_REQUEST:
			return [...state]
		case userConstants.DELETE_ONE_SUCCESS:
			return state.filter((item, i) => {
				return !(item.username === action.user.username)
			})
		case userConstants.DELETE_ONE_FAILURE:
			return [...state]

		case userConstants.UNLOCK_ONE_REQUEST:
			return [...state]
		case userConstants.UNLOCK_ONE_SUCCESS:
			let index = state.findIndex(el => el.username === action.user.username)
			state[index] = action.user
			return [...state]
		case userConstants.UNLOCK_ONE_FAILURE:
			return [...state]

		default:
			return state
	}
}

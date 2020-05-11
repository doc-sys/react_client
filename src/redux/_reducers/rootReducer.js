import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { alert } from './alert.reducer'
import { documentReducers } from './documents.reducer'
import { users } from './users.reducer'
import { message } from './message.reducer'

const rootReducer = combineReducers({
	authentication: authentication,
	files: documentReducers.documents,
	currentFile: documentReducers.singleDocument,
	registration,
	users,
	alert,
	message,
})

export default rootReducer

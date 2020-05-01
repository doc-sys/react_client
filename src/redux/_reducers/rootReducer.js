import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { alert } from './alert.reducer'
import { documentReducers } from './documents.reducer'
import { users } from './users.reducer'

const rootReducer = combineReducers({
	authentication: authentication,
	docs: documentReducers.documents,
	loadedDoc: documentReducers.singleDocument,
	registration,
	users,
	alert,
})

export default rootReducer

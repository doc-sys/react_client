import { documentConstants } from '../_constants/documents.constants'

export const documentReducers = {
	documents,
	singleDocument,
}

function documents(state = { ownDocuments: [], sharedDocuments: [] }, action) {
	switch (action.type) {
		// GET OWN DOCUMENTS
		case documentConstants.GET_OWN_REQUEST:
			return {
				...state,
				loadingOwn: true,
			}
		case documentConstants.GET_OWN_SUCCESS:
			return {
				...state,
				loadingOwn: false,
				ownDocuments: action.ownDocuments.docs,
			}
		case documentConstants.GET_OWN_FAILURE:
			return {
				...state,
				error: action.error,
			}

		// GET SHARED DOCUMENTS
		case documentConstants.GET_SHARED_REQUEST:
			return {
				...state,
				loadingShared: true,
			}
		case documentConstants.GET_SHARED_SUCCESS:
			return {
				...state,
				loadingShared: false,
				sharedDocuments: action.sharedDocuments,
			}
		case documentConstants.GET_SHARED_FAILURE:
			return {
				...state,
				error: action.error,
			}

		//DELETE DOCUMENT
		case documentConstants.DELETE_OWN_REQUEST:
			return {
				...state,
				ownDocuments: state.ownDocuments.map(doc =>
					doc.fileid === action.fileid ? { ...doc, deleting: true } : doc
				),
			}
		case documentConstants.DELETE_OWN_SUCCESS:
			return {
				...state,
				ownDocuments: state.ownDocuments.filter(doc => {
					return doc.fileId !== action.fileid
				}),
			}

		case documentConstants.DELETE_OWN_FAILURE:
			return {
				...state,
				ownDocuments: state.ownDocuments.map(doc => {
					if (doc.fileid === action.fileid) {
						const { deleting, ...docCopy } = doc
						return { ...docCopy, deleteError: action.error }
					}

					return doc
				}),
			}

		case documentConstants.CHECKOUT_SUCCESS:
			return {
				...state,
				ownDocuments: state.ownDocuments.map(doc => {
					if (doc.fileId === action.fileid) {
						return { ...doc, locked: true }
					} else {
						return doc
					}
				}),
			}

		// UPLOAD DOC
		case documentConstants.UPLOAD_REQUEST:
			return {
				...state,
				uploading: true,
			}

		case documentConstants.UPLOAD_SUCCESS:
			return {
				...state,
				ownDocuments: state.ownDocuments.push(action.doc),
				uploading: false,
			}

		case documentConstants.UPLOAD_ERROR:
			return {
				...state,
				uploading: false,
				error: action.error,
			}

		default:
			return state
	}
}

function singleDocument(
	state = { loadingDocument: false, document: null },
	action
) {
	switch (action.type) {
		//GET SINGLE DOCUMENT
		case documentConstants.GET_SINGLE_REQUEST:
			return {
				...state,
				loadingDocument: true,
			}
		case documentConstants.GET_SINGLE_SUCCESS:
			return {
				...state,
				loadingDocument: false,
				document: action.document.doc,
			}
		case documentConstants.GET_SINGLE_FAILURE:
			return {
				...state,
				error: action.error,
				loadingDocument: false,
			}

		//CLEAR DOC
		case documentConstants.CLEAR_SINGLE_SUCCESS:
			return {
				...state,
				loadingDocument: false,
				document: null,
			}

		case documentConstants.ADD_COMMENT_SUCCESS:
			return {
				...state,
				document: {
					...state.document,
					log: action.log,
				},
			}

		//CHECKOUT SINGLE
		case documentConstants.CHECKOUT_SUCCESS:
			return {
				...state,
				document: {
					...state.document,
					locked: true,
				},
			}
		//CHECKIN SINGLE

		//SHARE SINGLE DOCUMENT
		case documentConstants.SHARE_REQUEST:
			return {
				...state,
				sharing: true,
			}

		case documentConstants.SHARE_SUCCESS:
			return {
				...state,
				sharing: false,
				shared: true,
			}

		case documentConstants.SHARE_FAILURE:
			return {
				...state,
				sharing: false,
				error: action.error,
			}

		default:
			return state
	}
}

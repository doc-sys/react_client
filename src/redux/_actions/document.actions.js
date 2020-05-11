import { documentConstants } from '../_constants/documents.constants'
import { documentService } from '../_services/documents.service'
import { alertActions } from './alert.actions'
import { alertConstants } from '../_constants/alert.constants'

export const documentActions = {
	getOwn,
	getShared,
	getSingle,
	clearSingle,
	delete: _delete,
	share,
	checkout,
	uploadDocument,
	addComment,
	archive,
	queueOCR,
	queueKey,
}

function getOwn() {
	return dispatch => {
		dispatch(request())

		documentService.getOwn().then(
			docs => {
				dispatch(success(docs))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.GET_OWN_REQUEST }
	}
	function success(docs) {
		return { type: documentConstants.GET_OWN_SUCCESS, ownDocuments: docs }
	}
	function failure(error) {
		return { type: documentConstants.GET_OWN_FAILURE, error }
	}
}

function getShared() {
	return dispatch => {
		dispatch(request())

		documentService.getShared().then(
			docs => {
				dispatch(success(docs))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.GET_SHARED_REQUEST }
	}
	function success(docs) {
		return {
			type: documentConstants.GET_SHARED_SUCCESS,
			sharedDocuments: docs,
		}
	}
	function failure(error) {
		return { type: documentConstants.GET_SHARED_FAILURE, error }
	}
}

function getSingle(fileid) {
	return dispatch => {
		dispatch(request())

		documentService.getSingle(fileid).then(
			doc => {
				dispatch(success(doc))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.GET_SINGLE_REQUEST }
	}
	function success(doc) {
		return { type: documentConstants.GET_SINGLE_SUCCESS, document: doc }
	}
	function failure(error) {
		return { type: documentConstants.GET_SINGLE_FAILURE, error }
	}
}

function uploadDocument(formBody) {
	return dispatch => {
		dispatch(request())

		documentService.upload(formBody).then(
			doc => {
				dispatch(success(doc))
				dispatch(alertActions.success('Successfully uploaded document'))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.UPLOAD_REQUEST }
	}
	function success(doc) {
		return { type: documentConstants.UPLOAD_SUCCESS, document: doc }
	}
	function failure(error) {
		return { type: documentConstants.UPLOAD_ERROR, error }
	}
}

function clearSingle() {
	return dispatch => {
		dispatch(success())
	}

	function success(doc) {
		return { type: documentConstants.CLEAR_SINGLE_SUCCESS }
	}
}

function _delete(fileid) {
	return dispatch => {
		dispatch(request(fileid))

		documentService.delete(fileid).then(
			docs => {
				dispatch(success(fileid))
			},
			error => {
				dispatch(failure(error.toString(), fileid))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request(fileid) {
		return { type: documentConstants.DELETE_OWN_REQUEST, fileid: fileid }
	}
	function success(fileid) {
		return { type: documentConstants.DELETE_OWN_SUCCESS, fileid: fileid }
	}
	function failure(error, fileid) {
		return { type: documentConstants.DELETE_OWN_FAILURE, error }
	}
}

function share(fileid, whom) {
	return dispatch => {
		dispatch(request())

		documentService.share(fileid, whom).then(
			docs => {
				dispatch(success())
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.SHARE_REQUEST }
	}
	function success(docs) {
		return { type: documentConstants.SHARE_SUCCESS }
	}
	function failure(error) {
		return { type: documentConstants.SHARE_FAILURE, error }
	}
}

function checkout(fileId) {
	return dispatch => {
		dispatch(request())

		documentService.checkout(fileId).then(
			_ => {
				dispatch(success())
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.CHECKOUT_REQUEST }
	}
	function success() {
		return { type: documentConstants.CHECKOUT_SUCCESS, fileId }
	}
	function failure(error) {
		return { type: documentConstants.CHECKOUT_FAILURE, error }
	}
}

function addComment(fileId, comment) {
	return dispatch => {
		dispatch(request())

		documentService.addComment(fileId, comment).then(
			log => {
				dispatch(success(log))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.ADD_COMMENT_REQUEST }
	}
	function success(log) {
		return { type: documentConstants.ADD_COMMENT_SUCCESS, log }
	}
	function failure(error) {
		return { type: documentConstants.ADD_COMMENT_ERROR, error }
	}
}

function archive(fileId) {
	return dispatch => {
		dispatch(request())

		documentService.archive(fileId).then(
			file => {
				dispatch(success(file))
			},
			error => {
				dispatch(failure(error.toString()))
				dispatch(alertActions.error(error.toString()))
			}
		)
	}

	function request() {
		return { type: documentConstants.MOVE_ARCHIVE_REQUEST }
	}
	function success(file) {
		return { type: documentConstants.MOVE_ARCHIVE_SUCCESS, file }
	}
	function failure(error) {
		return { type: documentConstants.MOVE_ARCHIVE_ERROR, error }
	}
}

function queueOCR(fileId) {
	return dispatch => {
		documentService.queueOCR(fileId).then(
			data => {
				dispatch(alertActions.success('Added job to queue'))
			},
			error => {
				dispatch(alertActions.error(error.toString()))
			}
		)
	}
}

function queueKey(fileId) {
	return dispatch => {
		documentService.queueKey(fileId).then(
			data => {
				dispatch(alertActions.success('Added job to queue'))
			},
			error => {
				dispatch(alertActions.error(error.toString()))
			}
		)
	}
}

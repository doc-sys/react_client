import { documentConstants } from "../_constants/documents.constants";
import { documentService } from "../_services/documents.service";
import { alertActions } from "./alert.actions";

export const documentActions = {
  getOwn,
  getShared,
  getSingle,
  clearSingle,
  delete: _delete,
  share,
  checkout
};

function getOwn() {
  return dispatch => {
    dispatch(request());

    documentService.getOwn().then(
      docs => {
        dispatch(success(docs));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: documentConstants.GET_OWN_REQUEST };
  }
  function success(docs) {
    return { type: documentConstants.GET_OWN_SUCCESS, ownDocuments: docs };
  }
  function failure(error) {
    return { type: documentConstants.GET_OWN_FAILURE, error };
  }
}

function getShared() {
  return dispatch => {
    dispatch(request());

    documentService.getShared().then(
      docs => {
        dispatch(success(docs));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: documentConstants.GET_SHARED_REQUEST };
  }
  function success(docs) {
    return {
      type: documentConstants.GET_SHARED_SUCCESS,
      sharedDocuments: docs
    };
  }
  function failure(error) {
    return { type: documentConstants.GET_SHARED_FAILURE, error };
  }
}

function getSingle(fileid) {
  return dispatch => {
    dispatch(request());

    documentService.getSingle(fileid).then(
      doc => {
        dispatch(success(doc));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: documentConstants.GET_SINGLE_REQUEST };
  }
  function success(doc) {
    return { type: documentConstants.GET_SINGLE_SUCCESS, document: doc };
  }
  function failure(error) {
    return { type: documentConstants.GET_SINGLE_FAILURE, error };
  }
}

function clearSingle() {
  return dispatch => {
    dispatch(success());
  };

  function success(doc) {
    return { type: documentConstants.GET_SINGLE_SUCCESS, document: null };
  }
}

function _delete(fileid) {
  return dispatch => {
    dispatch(request(fileid));

    documentService.delete(fileid).then(
      docs => {
        dispatch(success(fileid));
      },
      error => {
        dispatch(failure(error.toString(), fileid));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(fileid) {
    return { type: documentConstants.DELETE_OWN_REQUEST, fileid: fileid };
  }
  function success(fileid) {
    return { type: documentConstants.DELETE_OWN_SUCCESS, fileid: fileid };
  }
  function failure(error, fileid) {
    return { type: documentConstants.GET_OWN_FAILURE, error, fileid: fileid };
  }
}

function share(fileid, whom) {
  return dispatch => {
    dispatch(request());

    documentService.share(fileid, whom).then(
      docs => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: documentConstants.SHARE_REQUEST };
  }
  function success(docs) {
    return { type: documentConstants.SHARE_SUCCESS };
  }
  function failure(error) {
    return { type: documentConstants.SHARE_FAILURE, error };
  }
}

function checkout(fileId) {
  return dispatch => {
    dispatch(request());

    documentService.checkout(fileId).then(
      _ => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: documentConstants.CHECKOUT_REQUEST };
  }
  function success() {
    return { type: documentConstants.CHECKOUT_SUCCESS, fileId };
  }
  function failure(error) {
    return { type: documentConstants.CHECKOUT_FAILURE, error };
  }
}

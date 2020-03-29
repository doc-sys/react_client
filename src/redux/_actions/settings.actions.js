import { settingsConstants } from "../_constants/settings.constants";

import { alertActions } from "./alert.actions";

import { settingsService } from "../_services/settings.service";

export const settingsActions = {
  upload
};

function upload(fileList) {
  return dispatch => {
    dispatch(request());

    settingsService.uploadAvatar(fileList).then(
      avatar => {
        dispatch(success(avatar));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: settingsConstants.AVATAR_REQUEST };
  }

  function success(avatar) {
    return { type: settingsConstants.AVATAR_SUCCESS, avatar };
  }

  function failure(error) {
    return { type: settingsConstants.AVATAR_ERROR, error };
  }
}

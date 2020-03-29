import { userConstants } from "../_constants/user.constants";
import { settingsConstants } from "../_constants/settings.constants";

let user = JSON.parse(localStorage.getItem("user"));
const initState = user ? { loggedIn: true, user } : {};

export function authentication(state = initState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};

    // REFLECT SETTINGS CHANGE IN AVATAR
    case settingsConstants.AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...user,
          avatar: action.avatar
        }
      };
    default:
      return state;
  }
}

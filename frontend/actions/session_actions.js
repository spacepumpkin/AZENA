import * as SessionApiUtil from "../util/session_api_util";

/* Export the following action constants:

`RECEIVE_CURRENT_USER` - loginCurrentUser(user) (`user` payload)
`LOGOUT_CURRENT_USER` - logoutCurrentUser()
`RECEIVE_SESSION_ERRORS` - receiveSessionErrors(errors) (`errors` payload)

Export the following thunk action creators with the specified parameters:

1. `signup(user)`
2. `login(user)`
3. `logout()`

*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

// For creating + logging in user (adds to users and session slices)
// ! Modified for user payload
const receiveCurrentUser = function (payload) {
  return {
    type: RECEIVE_CURRENT_USER,
    payload
  }
};

// remove currentUser from session slice
const logoutCurrentUser = function () {
  return {
    type: LOGOUT_CURRENT_USER,
  }
};

// accepts errors as array for errors slice
export const receiveSessionErrors = function (errors) {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
};

// THUNK ACTIONS --------------------------------------------------

export const signup = function (user) {
  return function (dispatch) {
    return (
      SessionApiUtil.signup(user)
        .then(
          (payload) => dispatch(receiveCurrentUser(payload)),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  };
};

export const login = function (user) {
  return function (dispatch) {
    return (
      SessionApiUtil.login(user)
        .then(
          (payload) => dispatch(receiveCurrentUser(payload)),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  }
};

export const logout = function () {
  return function (dispatch) {
    return (
      SessionApiUtil.logout()
        .then(
          () => dispatch(logoutCurrentUser()),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  }
};
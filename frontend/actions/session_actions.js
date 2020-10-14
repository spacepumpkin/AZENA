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
const receiveCurrentUser = function (user) {
  console.log("receiving current user...");
  return {
    type: RECEIVE_CURRENT_USER,
    user
  }
};

// remove currentUser from session slice
const logoutCurrentUser = function () {
  console.log("logging out current user...");
  return {
    type: LOGOUT_CURRENT_USER,
  }
};

// accepts errors as array for errors slice
const receiveSessionErrors = function (errors) {
  console.log("receiving session errors...");
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
};

// THUNK ACTIONS --------------------------------------------------

export const signup = function (user) {
  return function (dispatch) {
    console.log("dispatching signup");
    return (
      SessionApiUtil.signup(user)
        .then(
          (user) => dispatch(receiveCurrentUser(user)),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  };
};

export const login = function (user) {
  return function (dispatch) {
    console.log("dispatching login");
    return (
      SessionApiUtil.login(user)
        .then(
          (user) => dispatch(receiveCurrentUser(user)),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  }
};

export const logout = function () {
  return function (dispatch) {
    console.log("dispatching logout");
    return (
      SessionApiUtil.logout()
        .then(
          () => dispatch(logoutCurrentUser()),
          (errors) => dispatch(receiveSessionErrors(errors.responseJSON))
        )
    );
  }
};
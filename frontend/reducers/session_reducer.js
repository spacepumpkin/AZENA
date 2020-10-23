import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

/* Write a sessionReducer that respondsto these action types:
  RECEIVE_CURRENT_USER - login user by setting current user id to session slice
  LOGOUT_CURRENT_USER - logout user by removing current user id from session slice 
*/

// default session w/ no current user
const _nullSession = {
  id: null
};

const sessionReducer = function (oldState = _nullSession, action) {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (sessionReducer)");
      // ! Modified for user payload
      return Object.assign({}, oldState, {id: action.payload.currentUser.id});
    case LOGOUT_CURRENT_USER:
      // console.log("logging out current user");
      return _nullSession;
    default:
      return oldState;
  }
}

export default sessionReducer;

// session: {
//   id: null
// }
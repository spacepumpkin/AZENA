import {
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";

/* Write a usersReducer that responds to these action types:
  RECEIVE_CURRENT_USER - creates user by adding to users slice
*/

const usersReducer = function (oldState = {}, action) {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log("receiving current user (usersReducer)");
      // ! Modified for user payload
      const { users } = action.payload;
      return Object.assign({}, oldState, users);
      // return Object.assign({}, oldState, { [action.user.id]: action.user })
    default:
      return oldState;
  }
};

export default usersReducer;

// users: {
//   1: {
//     id: 1,
//     username: ""
//   },
// }
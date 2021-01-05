import {
  RECEIVE_WORKSPACE,
  RECEIVE_USER_WORKSPACES,
  REMOVE_WORKSPACE,
  // REMOVE_USERS_WORKSPACE
} from "../../actions/workspace_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const workspacesReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  const newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, action.payload.workspaces);
    case RECEIVE_WORKSPACE:
      return Object.assign({}, oldState, { [action.workspace.id]: action.workspace });
    case REMOVE_WORKSPACE:
      delete newState[action.workspace.id];
      return newState;
    // case REMOVE_USERS_WORKSPACE:
    //   THIS IS ONLY IF WE WANT ONLY THE CURRENT USER'S WORKSPACES IN REDUX STATE;
    //   OTHERWISE, KEEP THE WORKSPACE AND ONLY DELETE THE USERSWORKSPACE ASSOCIATION
    //   delete newState[action.usersWorkspace.workspaceId];
    //   return newState;
    // case RECEIVE_USER_WORKSPACES:
    //   return Object.assign({}, oldState, action.workspaces );
    default:
      return oldState;
  }
}

export default workspacesReducer;

// workspaces: {
//   1: {
//     id: 1,
//     name: "",
//     description: "",
//     creatorId: 1,
//   },
// }
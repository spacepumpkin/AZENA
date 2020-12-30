import {
  REMOVE_WORKSPACE,
  RECEIVE_USERS_WORKSPACE,
  REMOVE_USERS_WORKSPACE
} from "../../actions/workspace_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const userWorkspacesReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  const newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.payload.usersWorkspaces);
    case RECEIVE_USERS_WORKSPACE:
      // Assign workspace to user
      return Object.assign(newState, { [action.usersWorkspace.id]: action.usersWorkspace })
    case REMOVE_USERS_WORKSPACE:
      // Remove workspace from user
      delete newState[action.usersWorkspace.id];
      return newState;
    case REMOVE_WORKSPACE:
      // Remove all usersWorkspaces associated with destroyed workspace
      for (let id in newState) {
        if (newState[id].workspaceId === action.workspace.id) { delete newState[id] }
      }
      return newState;
    default:
      return oldState;
  }
}

export default userWorkspacesReducer;

// usersWorkspaces: {
//   1: {
//     id: 1,
//     userId: 1,
//     workspaceId: 1,
//   },
// }
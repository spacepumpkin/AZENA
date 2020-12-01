import { 
  RECEIVE_WORKSPACE,
  RECEIVE_USER_WORKSPACES,
  REMOVE_WORKSPACE
} from "../../actions/workspace_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const workspacesReducer = function(oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (workspacesReducer");
      // const { workspaces } = action.payload;
      return Object.assign({}, oldState, action.payload.workspaces);
    case RECEIVE_WORKSPACE:
      // console.log(`receiving workspace (workspacesReducer)`)
      return Object.assign({}, oldState, { [action.workspace.id]: action.workspace } );
    case REMOVE_WORKSPACE:
      // console.log(`removing workspace (workspacesReducer)`)
      const newState = Object.assign({}, oldState);
      delete newState[action.workspace.id];
      return newState;
    case RECEIVE_USER_WORKSPACES:
      // console.log(`receiving user workspaces (workspacesReducer)`)
      return Object.assign({}, oldState, action.workspaces );
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
//     creator_id: 1,
//   },
// }
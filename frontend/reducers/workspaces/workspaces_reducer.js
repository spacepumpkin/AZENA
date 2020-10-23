import { 
  RECEIVE_WORKSPACE,
  RECEIVE_USER_WORKSPACES
} from "../../actions/workspace_actions";

const workspacesReducer = function(oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      console.log(`receiving workspace (workspacesReducer)`)
      return Object.assign({}, oldState, { [action.workspace.id]: action.workspace } );
    case RECEIVE_USER_WORKSPACES:
      console.log(`receiving user workspaces (workspacesReducer)`)
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
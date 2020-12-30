import {
  RECEIVE_PROJECT,
  REMOVE_PROJECT
} from "../../actions/project_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const projectsReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, oldState, action.payload.projects );
    case RECEIVE_PROJECT:
      return Object.assign({}, oldState, { [action.project.id]: action.project });
    case REMOVE_PROJECT:
      const newState = Object.assign({}, oldState);
      delete newState[action.project.id];
      return newState;
    default:
      return oldState;
  }

}

export default projectsReducer;

// projects: {
//   1: {
//     id: 1,
//     name: "",
//     description: "",
//     creatorId: 1,
//     workspaceId: 1
//   },
// }
import {
  RECEIVE_PROJECT,
  RECEIVE_PROJECT_ERRORS
} from "../../actions/project_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const projectsReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (projectsReducer");
      return Object.assign({}, oldState, action.payload.projects );
    case RECEIVE_PROJECT:
      // console.log("receiving project (projectsReducer)");
      return Object.assign({}, oldState, { [action.project.id]: action.project });
    default:
      return oldState;
  }

}

export default projectsReducer;
import {
  RECEIVE_PROJECT,
  RECEIVE_PROJECT_ERRORS
} from "../../actions/project_actions";

const projectsReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_PROJECT:

      return;

    default:
      return oldState;
  }

}

export default projectsReducer;
import {
  RECEIVE_PROJECT,
  RECEIVE_PROJECT_ERRORS
} from "../../actions/project_actions";

const projectsErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_PROJECT:
      // console.log("receiving project (projectsErrorsReducer)");
      return [];
    case RECEIVE_PROJECT_ERRORS:
      console.log(`receiving project errors (projectsErrorsReducer)`)
      return Object.assign([], oldState, action.errors)
    default:
      return oldState;
  }
}

export default projectsErrorsReducer;
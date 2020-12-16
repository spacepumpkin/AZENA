import { RESET_ALL_ERRORS } from "../../actions/error_actions";
import {
  RECEIVE_WORKSPACE,
  RECEIVE_WORKSPACE_ERRORS
} from "../../actions/workspace_actions";

const workspacesErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      // console.log("receiving workspace (workspacesErrorsReducer)");
      return [];
    case RECEIVE_WORKSPACE_ERRORS:
      // console.log(`receiving workspace errors (workspacesErrorsReducer)`)
      return Object.assign([], oldState, action.errors);
    case RESET_ALL_ERRORS:
      return [];
    default:
      return oldState;
  }
}

export default workspacesErrorsReducer;
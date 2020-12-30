import { RESET_ALL_ERRORS } from "../../actions/error_actions";
import {
  RECEIVE_SECTION,
  RECEIVE_SECTION_ERRORS
} from "../../actions/section_actions";

const sectionsErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SECTION:
      return [];
    case RECEIVE_SECTION_ERRORS:
      return Object.assign([], oldState, action.errors);
    case RESET_ALL_ERRORS:
      return [];
    default:
      return oldState;
  }
}

export default sectionsErrorsReducer;
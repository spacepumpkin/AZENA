import { RESET_ALL_ERRORS } from "../../actions/error_actions";
import {
  RECEIVE_SECTION,
  RECEIVE_SECTION_ERRORS
} from "../../actions/section_actions";

const sectionsErrorsReducer = function (oldState = [], action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SECTION:
      // console.log("receiving section (sectionsErrorsReducer)");
      return [];
    case RECEIVE_SECTION_ERRORS:
      // console.log(`receiving section errors (sectionsErrorsReducer)`)
      return Object.assign([], oldState, action.errors);
    case RESET_ALL_ERRORS:
      return [];
    default:
      return oldState;
  }
}

export default sectionsErrorsReducer;
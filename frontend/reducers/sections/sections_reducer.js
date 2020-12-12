import {
  RECEIVE_SECTION,
  REMOVE_SECTION
} from "../../actions/section_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const sectionsReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // console.log("receiving current user (sectionsReducer");
      return Object.assign({}, oldState, action.payload.sections);
    case RECEIVE_SECTION:
      // console.log("receiving section (sectionsReducer)");
      return Object.assign({}, oldState, { [action.section.id]: action.section });
    case REMOVE_SECTION:
      // console.log(`removing section (sectionsReducer)`)
      const newState = Object.assign({}, oldState);
      delete newState[action.section.id];
      return newState;
    default:
      return oldState;
  }
}

export default sectionsReducer;

// sections: {
//   1: {
//     id: 1,
//     order: 1,
//     projectId: 1
//   },
// }
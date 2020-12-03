import {
  TOGGLE_SIDEBAR
} from "../../actions/ui_actions.js";

const _defaultUI = {
  sidebarCollapse: false,
  darkTheme: false
};

const uiReducer = function (oldState = _defaultUI, action) {
  Object.freeze(oldState);

  switch (action.type) {
    case TOGGLE_SIDEBAR:
      // console.log("toggling sidebar (uiReducer)");
      return Object.assign({}, oldState, { sidebarCollapse: !oldState.sidebarCollapse })
    default:
      return oldState;
  }
};

export default uiReducer;
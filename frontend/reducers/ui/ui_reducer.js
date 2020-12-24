import {
  TOGGLE_SIDEBAR,
  SET_CURRENT_WORKSPACE,
  SET_MODAL
} from "../../actions/ui_actions";

const _defaultUI = {
  sidebarCollapse: false,
  darkTheme: false,
  currentWorkspaceId: -1,
  modal: null
};

const uiReducer = function (oldState = _defaultUI, action) {
  Object.freeze(oldState);

  switch (action.type) {
    case TOGGLE_SIDEBAR:
      // console.log("toggling sidebar (uiReducer)");
      return Object.assign({}, oldState, { sidebarCollapse: !oldState.sidebarCollapse });
    case SET_CURRENT_WORKSPACE:
      return Object.assign({}, oldState, { currentWorkspaceId: action.workspaceId });
    case SET_MODAL:
      return Object.assign({}, oldState, { modal: action.modalType });
    default:
      return oldState;
  }
};

export default uiReducer;
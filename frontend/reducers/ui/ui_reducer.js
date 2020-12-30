import {
  TOGGLE_SIDEBAR,
  SET_CURRENT_ITEMS,
  SET_MODAL
} from "../../actions/ui_actions";

const _defaultUI = {
  sidebarCollapse: false,
  darkTheme: false,
  currentItems: { workspaceId: -1, projectId: -1},
  currentModal: null
};

const uiReducer = function (oldState = _defaultUI, action) {
  Object.freeze(oldState);

  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, oldState, { sidebarCollapse: !oldState.sidebarCollapse });
    case SET_CURRENT_ITEMS:
      const newState = Object.assign({}, oldState);
      Object.assign(newState.currentItems, { workspaceId: action.workspaceId, projectId: action.projectId });
      return newState;
    case SET_MODAL:
      return Object.assign({}, oldState, { currentModal: action.modalType });
    default:
      return oldState;
  }
};

export default uiReducer;
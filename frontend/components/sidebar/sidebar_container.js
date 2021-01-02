import { connect } from 'react-redux';
import SideBar from './sidebar';

import { toggleSidebar, setCurrentItems, setModal } from "../../actions/ui_actions";
import { destroyWorkspace, unassignUsersWorkspace } from '../../actions/workspace_actions';

const mSP = function ({ ui, entities, session }) {
  return {
    workspaces: entities.workspaces,
    projects: entities.projects,
    sidebarCollapse: ui.sidebarCollapse,
    currentItems: ui.currentItems,
    currentUserId: session.id
  }
};

const mDP = function (dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar),
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId)),
    unassignUsersWorkspace: (userId, workspaceId) => dispatch(unassignUsersWorkspace(userId, workspaceId)),
    setCurrentItems: (items) => dispatch(setCurrentItems(items)),
    setModal: (modalType) => dispatch(setModal(modalType))
  }
};

export default connect(mSP, mDP)(SideBar);
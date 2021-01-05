import { connect } from 'react-redux';
import SideBar from './sidebar';

import { toggleSidebar, setCurrentItems, setModal } from "../../actions/ui_actions";
import { destroyWorkspace, unassignUsersWorkspace } from '../../actions/workspace_actions';

const mSP = function ({ ui, entities, session }) {

  // Separate user's assigned workspaces (given by usersWorkspaces) from all workspaces
  const allWorkspaces = entities.workspaces;
  const workspaces = {};
  Object.values(entities.usersWorkspaces).forEach(usersWorkspace => {
    if (usersWorkspace.userId === session.id) {
      workspaces[usersWorkspace.workspaceId] = allWorkspaces[usersWorkspace.workspaceId];
    }
  })

  return {
    workspaces: workspaces,
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
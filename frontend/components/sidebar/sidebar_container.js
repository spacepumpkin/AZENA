import { connect } from 'react-redux';
import SideBar from './sidebar';

import { toggleSidebar } from "../../actions/ui_actions.js";
import { destroyWorkspace } from '../../actions/workspace_actions';

const mSP = function ({ ui, entities, session }) {
  return {
    workspaces: entities.workspaces,
    projects: entities.projects,
    sidebarCollapse: ui.sidebarCollapse,
    currentUserId: session.id
  }
};

const mDP = function (dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    destroyWorkspace: (workspaceId) => dispatch(destroyWorkspace(workspaceId))
  }
};

export default connect(mSP, mDP)(SideBar);
import { connect } from 'react-redux';
import SideBar from './sidebar';

import { toggleSidebar } from "../../actions/ui_actions.js";

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
    toggleSidebar: () => dispatch(toggleSidebar())
  }
};

export default connect(mSP, mDP)(SideBar);
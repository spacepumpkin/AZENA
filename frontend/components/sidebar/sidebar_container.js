import { connect } from 'react-redux';
import SideBar from './sidebar';

import { toggleSidebar } from "../../actions/ui_actions.js";

const mSP = function ({ ui, entities }) {
  return {
    workspaces: entities.workspaces,
    projects: entities.projects,
    sidebarCollapse: ui.sidebarCollapse
  }
};

const mDP = function (dispatch) {
  return {
    toggleSidebar: () => dispatch(toggleSidebar())
  }
};

export default connect(mSP, mDP)(SideBar);
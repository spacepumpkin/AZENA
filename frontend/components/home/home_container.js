import { connect } from "react-redux";
import Home from "./home";

import { setCurrentItems, setModal } from '../../actions/ui_actions';

const mSP = function({ entities, session, ui }) {
  const { users, workspaces, projects } = entities;

  return {
    users,
    workspaces,
    projects,
    session,
    currentItems: ui.currentItems
  };
};

const mDP = function(dispatch) {
  return {
    setCurrentItems: (items) => dispatch(setCurrentItems(items)),
    setModal: (modalType) => dispatch(setModal(modalType))
  };
};

export default connect(mSP, mDP)(Home);
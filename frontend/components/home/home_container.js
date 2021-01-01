import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import Home from "./home";

// import { fetchUserWorkspaces } from "../../actions/workspace_actions";
// import { logout } from "../../actions/session_actions";
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
// export default withRouter(connect(mSP, mDP)(Home));
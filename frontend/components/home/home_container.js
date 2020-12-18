import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import Home from "./home";

// import { fetchUserWorkspaces } from "../../actions/workspace_actions";
// import { logout } from "../../actions/session_actions";

const mSP = function(state) {
  return {
    reduxState: state
  };
};

const mDP = function(dispatch) {
  return {
    // logout: () => dispatch(logout()),
    // fetchUserWorkspaces: () => dispatch(fetchUserWorkspaces())
  };
};

export default connect(mSP, mDP)(Home);
// export default withRouter(connect(mSP, mDP)(Home));
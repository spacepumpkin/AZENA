import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import UserHome from "./user_home";
import Main from "../main/main"

import { logout } from "./../../actions/session_actions";

const mSP = function(state) {
  return {
    page: "Home"
  };
};

const mDP = function(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
};

// export default connect(mSP, mDP)(UserHome);
export default withRouter(connect(mSP, mDP)(Main));
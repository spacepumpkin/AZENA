import {connect} from "react-redux";
import UserHome from "./user_home";

import { logout } from "./../../actions/session_actions";

const mSTP = function(state) {
  return {

  };
};

const mDTP = function(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mSTP, mDTP)(UserHome);
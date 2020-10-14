import { connect } from "react-redux";
import SessionForm from "./session_form";

import { login } from "../../actions/session_actions";

const mapStateToProps = function (state) {
  return {
    formType: "Log In"
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionAction: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
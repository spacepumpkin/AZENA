import { connect } from "react-redux";
import SessionForm from "./session_form";

import { login } from "../../actions/session_actions";

const mapStateToProps = function (state, ownProps) {
  return {
    formType: "Log In",
    errors: state.errors
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionAction: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
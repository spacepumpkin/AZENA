import { connect } from "react-redux";
import SessionForm from "./session_form";

import { signup, receiveSessionErrors, login } from "../../actions/session_actions";

const mapStateToProps = function (state) {
  return {
    formType: "Sign Up",
    sessionErrors: state.errors.session
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    login: (user) => dispatch(login(user)),
    processForm: (user) => dispatch(signup(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
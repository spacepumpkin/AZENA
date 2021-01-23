import { connect } from "react-redux";
import SessionForm from "./session_form";

import { signup, receiveSessionErrors, login } from "../../actions/session_actions";
import { setLoader } from "../../actions/ui_actions";

const mapStateToProps = function (state) {
  return {
    formType: "Sign Up",
    sessionErrors: state.errors.session
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    setLoader: (loaderState) => dispatch(setLoader(loaderState)),
    login: (user) => dispatch(login(user)),
    processForm: (user) => dispatch(signup(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
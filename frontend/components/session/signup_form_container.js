import { connect } from "react-redux";
import SessionForm from "./session_form";

import { signup } from "../../actions/session_actions";

const mapStateToProps = function (state) {
  return {
    formType: "Sign Up",
    user: { email: "", password: "" },
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionAction: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
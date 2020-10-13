import React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util"; 

import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashContainer from "./splash/splash_container";
import UserHomeContainer from "./home/user_home_container";

// import logo from "../../assets/images/FSPLogo-azena-blue-black.png"; // with import

// ! use AuthRoute and ProtectedRoute later

const App = function (props) {
  console.log("rendering App...")
  return (
    <>
      <header>
        {/* <img src={"../../assets/images/fsp-logo-blue-black.png"} alt="azena logo" /> */}
      </header>
      <Switch>
        <Route exact path="/signup" component={SignupFormContainer} />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route exact path="/home" component={UserHomeContainer} />
        <Route path="/" component={SplashContainer} />
      </Switch>
    </>
  );
};

export default App;
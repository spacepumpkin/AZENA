import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthRoute as PreAuthRoute, ProtectedRoute as PostAuthRoute } from "../util/route_util"; 

import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashContainer from "./splash/splash_container";
import UserHomeContainer from "./home/user_home_container";

// ! use AuthRoute and ProtectedRoute later
// AuthRoute / PreAuth - current user should not access - redirect to /home
// ProtectedRoute - only current user can access - redirect to /

const App = function (props) {
  console.log("rendering App...")
  return (
    <>
      <header>
      </header>
      {/* <button id="theme-switch" type="button"> Change Theme </button> */}
      <Switch>
        <PostAuthRoute exact path="/home" component={UserHomeContainer} />
        <PreAuthRoute exact path="/signup" component={SignupFormContainer} />
        <PreAuthRoute exact path="/login" component={LoginFormContainer} />
        {/* <PreAuthRoute exact path="/demologin" demo="demo" component={LoginFormContainer} /> // ! Ryan's method for demologin */}
        <PreAuthRoute exact path="/" component={SplashContainer} />
        <Redirect to="/">{console.log("redirecting to /")}</Redirect>
      </Switch>
    </>
  );
};

export default App;
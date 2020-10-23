// Functionality Imports
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

// Component Imports associated with Routes
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashContainer from "./splash/splash_container";
// import MainContainer from "./main/main_container";

import SidebarContainer from "./sidebar/sidebar_container"; // always there
import TopBarContainer from "./topbar/topbar_container";    // always there
import HomeContainer from "./home/home_container";
  
// AuthRoute / PreAuth - current user should not access - redirect to /home
// ProtectedRoute / PostAuth - only current user can access - redirect to /

const App = function (props) {
  console.log("rendering App...")
  return (
    <div>
      {/* <button id="theme-switch" type="button"> Change Theme </button> */}
      <ProtectedRoute path="/" component={SidebarContainer} />
      {/* <div > */}
      <ProtectedRoute path="/" component={TopBarContainer} />
      <Switch>
        <ProtectedRoute path="/home" component={HomeContainer} />
        <ProtectedRoute exact path="/workspaces/:workspaceId" component={HomeContainer} />
        {/* <ProtectedRoute exact path="/projects/:projectId/board" component={ProjectBoardContainer} /> */}
        {/* <ProtectedRoute exact path="/projects/:projectId/list" component={ProjectListContainer} /> */}
        {/* <ProtectedRoute exact path="/test1" component={MainContainer} />
        <ProtectedRoute exact path="/test2" component={MainContainer} /> */}
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        {/* <AuthRoute exact path="/demologin" demo="demo" component={LoginFormContainer} /> // ! Ryan's method for demologin */}
        <AuthRoute id="splash" exact p  ath="/" component={SplashContainer} />
        <AuthRoute path="/" component={SplashContainer} />
        {/* <Redirect to="/" /> */}
      </Switch>
      {/* </div> */}
    </div>
  );
};

export default App;
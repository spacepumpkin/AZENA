// Functionality Imports
import React from "react";
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, AuthLayout, ProtectedRoute, ProtectedLayout } from "../util/route_util";

// Component Imports associated with Routes
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import SplashContainer from "./splash/splash_container";
// import MainContainer from "./main/main_container";

import SidebarContainer from "./sidebar/sidebar_container"; // always there
import TopBarContainer from "./topbar/topbar_container";    // always there
import HomeContainer from "./home/home_container";
import WorkspaceContainer from "./workspace/workspace_container";
import ProjectListContainer from './projects/project_list_container';
import ProjectFormContainer from './projects/project_form_container';
import WorkspaceModalContainer from './workspace/workspace_modal_container';

import Feedback from './main/feedback';

// AuthRoute / PreAuth - current user should not access - redirect to /home
// ProtectedRoute / PostAuth - only current user can access - redirect to /

const App = function (props) {
  // console.log("rendering App...")
  return (
    <div id="main-wrapper">
      {/* <button id="theme-switch" type="button"> Change Theme </button> */}
      {/* Protected Routes */}
      <Feedback />
      <ProtectedLayout     
        component={
          <div id="main">
            <Route path="/" component={SidebarContainer} />
            <div id="mainbox">
              <Route path="/" component={TopBarContainer} />
              <div id="main-content">
                <Switch>
                  <ProtectedRoute exact path="/home" component={HomeContainer} />
                  <Route exact path="/workspaces/new" component={WorkspaceModalContainer} />
                  <Route exact path="/workspaces/:workspaceId(\d+)/projects/new" component={ProjectFormContainer} />
                  <ProtectedRoute exact path="/workspaces/:workspaceId(\d+)" component={WorkspaceContainer} />
                  {/* <ProtectedRoute exact path="/projects/:projectId/board" component={ProjectBoardContainer} /> */}
                  <ProtectedRoute exact path="/projects/:projectId(\d+)/list" component={ProjectListContainer} />
                  {/* <ProtectedRoute exact path="/test1" component={MainContainer} />
        <ProtectedRoute exact path="/test2" component={MainContainer} /> */}
                  <Redirect to="/home" />
                  {/* <Route path="/" render={() => <div>Page Not Found</div>} /> */}
                </Switch>
              </div>
            </div>
          </div>
        }
      />

      {/* Auth Routes */}
      <AuthLayout
        component={
          <Switch>
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            {/* <AuthRoute exact path="/demologin" demo="demo" component={LoginFormContainer} /> // ! Ryan's method for demologin */}
            <AuthRoute id="splash" exact path="/" component={SplashContainer} />
            <Redirect to="/" />
            {/* <AuthRoute path="/" component={SplashContainer} /> */}
          </Switch>
        }
      />
    </div>

  );
};

const mSP = function (state) { return { reduxState: state } };

export default connect(mSP)(App);
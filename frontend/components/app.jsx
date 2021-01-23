// Functionality Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, AuthLayout, ProtectedRoute, ProtectedLayout } from '../util/route_util';

import { setLoader } from '../actions/ui_actions';

// Main Components

// * USER AUTH & SPLASH
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import Splash from './splash/splash';

// * OVERLAY COMPONENTS
import SidebarContainer from './sidebar/sidebar_container'; // always there
import TopBarContainer from './topbar/topbar_container';    // always there

// * MAIN CONTENT
import HomeContainer from './home/home_container';
import MyTasks from './my_tasks/my_tasks';
import WorkspaceContainer from './workspace/workspace_container';
import ProjectListContainer from './projects/project_list_container';

// * MODALS
import ProjectCreateModal from './projects/project_create_modal';
import WorkspaceCreateModalContainer from './workspace/workspace_create_modal_container';
import WorkspaceDeleteModal from './workspace/workspace_delete_modal';
import ProjectDeleteModal from './projects/project_delete_modal';

import Feedback from './main/feedback';

// AuthRoute / PreAuth - current user should not access - redirect to '/home'
// ProtectedRoute / PostAuth - only current user can access - redirect to '/'

const App = function ({ ui, entities }) {
  const { currentModal, items, loader } = ui;
  const { workspaces, projects } = entities;

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(-1);
  const [showProjectModal, toggleProjectModal] = React.useState(false);
  // let showProjectModal = false;
  const [currentWorkspace, setCurrentWorkspace] = useState({ name: '' });

  useEffect(() => {
    if (currentWorkspaceId !== -1) {
      setCurrentWorkspace(workspaces[currentWorkspaceId]);
      toggleProjectModal(true);
    } else {
      setCurrentWorkspace({ name: '' });
      toggleProjectModal(false);
    }

    return () => {
      // console.log(`New current workspace: ${currentWorkspaceId}`);
    };
  }, [currentWorkspaceId])

  return (
    <div id="main-wrapper">
      {/* <button id="theme-switch" type="button"> Change Theme </button> */}
      <Feedback />

      {/* Protected Routes */}
      <ProtectedLayout
        component={
          <div id="main">
            <SidebarContainer setCurrentWorkspaceId={setCurrentWorkspaceId} />

            {/* MODALS */}
            {currentModal === "Project Create" && <ProjectCreateModal />}
            {currentModal === "Project Delete" && <ProjectDeleteModal />}
            {currentModal === "Workspace Delete" && <WorkspaceDeleteModal />}

            <div id="mainbox">
              <TopBarContainer setCurrentWorkspaceId={setCurrentWorkspaceId} />
              <div id="main-content">
                <Switch>
                  <Route exact path="/home" component={HomeContainer} />
                  <Route exact path="/mytasks" component={MyTasks} />
                  <Route exact path="/workspaces/new" component={WorkspaceCreateModalContainer} />
                  <Route exact path="/workspaces/:workspaceId(\d+)" component={WorkspaceContainer} />
                  {/* <ProtectedRoute exact path="/projects/:projectId/board" component={ProjectBoardContainer} /> */}
                  <Route exact path="/projects/:projectId(\d+)/list" component={ProjectListContainer} />
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
          <>
            <Switch>
              <AuthRoute exact path="/signup" component={SignupFormContainer} />
              <AuthRoute exact path="/login" component={LoginFormContainer} />
              {/* <AuthRoute exact path="/demologin" demo="demo" component={LoginFormContainer} /> // ! Ryan's method for demologin */}
              <AuthRoute exact path="/" component={Splash} />
              <Redirect to="/" />
            </Switch>
            {loader &&
              <Loader />
            }
          </>
        }
      />
    </div>

  );
};

const mSP = function (state) { return state };

export default connect(mSP)(App);
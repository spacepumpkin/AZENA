import { func } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom"

const mSP = function(state) {
  return {
    loggedIn: Boolean(state.session.id)
  }
};

// Auth Route

const Auth = function ({ loggedIn, path, component: Component}) {
  console.log("in Auth route");
  return (
    <Route
      path={path}
      render={(props) => (
        loggedIn ? <Redirect to="/home" /> : <Component {...props} />
      )}
      />
  );
};

// Protected Route

const Protected = function ({ loggedIn, path, component: Component}) {
  console.log("in Protected route");
  return (
    <Route
      path={path}
      render={(props) => (
        loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
      )}
    />
  );
};

export const AuthRoute = withRouter(connect(mSP)(Auth));
export const ProtectedRoute = withRouter(connect(mSP)(Protected));
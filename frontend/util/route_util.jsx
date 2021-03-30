import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom"

const mSP = function(state) {
  return {
    loggedIn: Boolean(state.session.id)
  }
};

// Auth Route / PreAuth Route

const Auth = function ({ loggedIn, path, component: Component}) {
  // console.log("in Auth route");
  return (
    <Route
      path={path}
      render={(props) => (
        loggedIn ? <Redirect to="/home" /> : <Component {...props} />
      )}
      />
  );
};

// Protected Route / PostAuth Route

const Protected = function ({ loggedIn, path, page, component: Component}) {
  // console.log("in Protected route");
  return (
    <Route
      path={path}
      render={(props) => (
        loggedIn ? <Component {...props} page={page} /> : <Redirect to="/login" />
      )}
    />
  );
};

const ProtectedCheck = function ({ loggedIn, component: Component }) {
  return (
    loggedIn ? Component : null
  )
}

const AuthCheck = function ({ loggedIn, component: Component }) {
  return (
    !loggedIn ? Component : null
  )
}

export const AuthRoute = withRouter(connect(mSP)(Auth));
export const ProtectedRoute = withRouter(connect(mSP)(Protected));
export const ProtectedLayout = withRouter(connect(mSP)(ProtectedCheck));
export const AuthLayout = withRouter(connect(mSP)(AuthCheck));
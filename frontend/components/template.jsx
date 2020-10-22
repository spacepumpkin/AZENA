// * --------------------- COMPONENTS / CONTAINERS -------------------------------
import React from "react";

export default class Blank extends React.Component {
  constructor(props) {
    super(props);

  }
  render () {
    
    return (
      <>
      </>
    )
  }
};

import { connect } from "react-redux";

const mSP = function(store) {
  return {

  };
};

const mDP = function(dispatch) {
  return {

  };
};

export default connect(mSP, mDP)(Blank);

// * ------------------------------ API UTIL -------------------------------

/* Blank API Util Functions:
  - fetchBlank(blankId)
  - createBlank(blank)
  - updateBlank(blank)
  - deleteBlank(blankId)

  - fetchBlanks(userId) // fetch all blanks associated with user
*/

export const createBlank = (blank) => {
  console.log(`creating new blank...`);
  return $.ajax({
    url: `/api/blanks`,
    method: "POST",
    data: { blank: {  } }
  })
}

// * ------------------------------ ACTIONS -------------------------------

import * as BlankApiUtil from "../util/blank_api_util";

/* Export action constants:

* `RECEIVE_BLANK` - receiveBlank (`blank` payload)
* `RECEIVE_BLANK_ERRORS` - receiveBlankErrors(errors) (`errors` payload)

Export thunk action creators with the specified parameters:

* createBlank(blank) -> receiveBlank or receiveBlankErrors

*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_BLANK = "RECEIVE_BLANK";
export const RECEIVE_BLANK_ERRORS = "RECEIVE_BLANK_ERRORS";

const receiveBlank = function (blank) {
  console.log("receiving blank");
  return {
    type: RECEIVE_BLANK,
    blank
  }
}

const receiveBlankErrors = function (errors) {
  console.log("receiving blank errors");
  return {
    type: RECEIVE_BLANK_ERRORS,
    errors
  }
}

// THUNK ACTIONS --------------------------------------------------

export const createBlank = function (blank) {
  return function (dispatch) {
    console.log("dispatching createBlank");
    return (
      BlankApiUtil.createBlank(blank)
        .then(
          (blank) => dispatch(receiveBlank(blank)),
          (errors) => dispatch(receiveBlankErrors(errors.responseJSON))
        )
    );
  };
};

// * ------------------------------ REDUCERS -------------------------------

import {
  RECEIVE_BLANK,
} from "../../actions/blank_actions";

const blanksReducer = function (oldState = {}, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_BLANK:
      console.log(`receiving blank (blanksReducer)`)
      return Object.assign({}, oldState, action.blank);
    default:
      return oldState;
  }
}

export default blanksReducer;
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

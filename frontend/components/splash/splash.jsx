import React from "react";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("rendering Splash...");
    return (
      <div>
        <h1>WELCOME TO AZENA</h1>
      </div>
    )
  }
};
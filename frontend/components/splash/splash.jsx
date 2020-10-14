import React from "react";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
  }

  render() {
    console.log("rendering Splash...");
    return (
      <div>
        <div id="logo">
          <img src={window.logoMainURL} />
        </div>
        <h1>WELCOME TO AZENA</h1>
      </div>
    )
  }
};
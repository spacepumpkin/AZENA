import React from "react";
import { Link } from "react-router-dom";

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
        <div> Please{" "}
          <Link className="session-button" to="/login">Log In</Link>{" "}
          or{" "}
          <Link className="session-button" to="/signup">Sign Up</Link>
        </div>
        <br />
        <button id="theme-switch"> Don't Press This Button </button>
      </div>
    )
  }
};
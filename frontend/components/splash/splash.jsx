import React from "react";
import { Link } from "react-router-dom";
import SplashNav from "./splash_nav/splash_nav";
import SplashMain from "./splash_main/splash_main";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Splash page");
  }

  render() {
    console.log("rendering Splash...");
    return (
      <div id="splash">
        <SplashNav />
        {/* <button id="theme-switch" > Don't Press This Button </button> */}
        <SplashMain />
        <footer id="splash-footer">
          <div id="splash-footer-content">
            <div class="profile-links">
            <Link to="https://github.com/spacepumpkin/AZENA"><img src={window.github} alt="github profile"/></Link>
            <Link to="#"><img src={window.linkedin} alt="linkedin profile"/></Link>
            </div>
          </div>
        </footer>
      </div>
    )
  }
};
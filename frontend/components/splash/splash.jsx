import React from "react";
import { Link } from "react-router-dom";
import SplashNav from "./splash_nav/splash_nav";
import SplashMain from "./splash_main/splash_main";
import SplashFooter from "./splash_main/splash_footer";

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
        <SplashFooter />
      </div>
    )
  }
};
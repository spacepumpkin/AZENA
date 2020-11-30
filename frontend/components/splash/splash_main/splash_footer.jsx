import React from "react";
import { Link } from "react-router-dom";

const SplashFooter = function (props) {

  return (
    <footer id="splash-footer">
      <div id="splash-footer-content">
        <div className="footer-logo-wrapper" ><img className="footer-logo"src={window.logoIcon1} alt="small azena icon"/></div>
        <div className="footer-greeting">
          Thank you for visiting Azena!
        </div>
        <div className="profile-links">
          <Link to="https://github.com/spacepumpkin/AZENA"><img src={window.github} alt="github profile" /></Link>
          <Link to="https://www.linkedin.com/in/gary-w-269749ba/"><img src={window.linkedin} alt="linkedin profile" /></Link>
        </div>
      </div>
    </footer>
  )
}

export default SplashFooter;
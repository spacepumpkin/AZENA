import React, { useState } from "react";
import { Link } from "react-router-dom";

const SplashFooter = function (props) {

  return (
    <footer id="splash-footer">
      <div id="splash-footer-content">
        <div className="footer-logo-wrapper">
          {/* <img className={"footer-logo"} src={window.logoIcon1} alt="small azena icon" /> */}
          <div className={"footer-logo"}></div>
        </div>
        <div className="footer-greeting">
          Thank you for visiting Azena!
        </div>
        <div className="splash-profile-links">
          <a href="https://github.com/spacepumpkin/AZENA" target={"_blank"} rel="noreferrer noopener">
            <img src={window.github} alt="github profile" />
          </a>
          <a href="https://www.linkedin.com/in/gary-wan" target={"_blank"} rel="noreferrer noopener">
            <img src={window.linkedin} alt="linkedin profile" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default SplashFooter;
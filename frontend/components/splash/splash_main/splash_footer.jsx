import React from "react";
import { Link } from "react-router-dom";

const SplashFooter = function (props) {

  return (
    <footer id="splash-footer">
      <div id="splash-footer-content">
        <div class="footer-greeting">
          Thank you for visiting Azena!
        </div>
        <div class="profile-links">
          <Link to="https://github.com/spacepumpkin/AZENA"><img src={window.github} alt="github profile" /></Link>
          <Link to="#"><img src={window.linkedin} alt="linkedin profile" /></Link>
        </div>
      </div>
    </footer>
  )
}

export default SplashFooter;
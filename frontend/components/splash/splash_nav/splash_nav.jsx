import React from "react";
import { Link } from "react-router-dom";
// import SplashNavItem from "./splash_nav_item";

const SplashNav = function (props) {
  // const splashNavLeft = {
  //   "Why Azena?": {paths: [""], type: "dropdown", children: []},
  //   "Features" : {paths: ["/", "/"], type: "dropdown", children: ["Create Projects", "Assign Tasks to Suit Your Needs"]},
  //   "Pricing" : {paths: "", type: "link", children: []}
  // };

  function toggleDropDown(evt) {
    evt.currentTarget.classList.toggle("active-btn")
    evt.currentTarget.nextSibling.classList.toggle("hide")
  }

  return (
    <div id="splash-nav-wrapper">
      <div id="splash-nav">
        <div id="splash-nav-logo"><Link to="/"><img id="splash-logo" src={window.logoMainURL} /></Link></div>
        {/* <nav id="splash-nav-items">
          <div className="splash-nav-item">
            <button type="button">Why Azena?</button>
            <ul className="splash-nav-dropdown hide">
              <li><Link to="/">Why not?</Link></li>
              <li><Link to="/">Why anything?</Link></li>
              <li><Link to="/">Why?</Link></li>
            </ul>
          </div>
          <div className="splash-nav-item">
            <button type="button">Features</button>
            <ul className="splash-nav-dropdown hide">
              <li><Link to="/">Create Projects</Link></li>
              <li><Link to="/">Assign Tasks to Suit Your Needs</Link></li>
            </ul>
          </div>
          <div className="splash-nav-item">
            <Link to="/"><button type="button">Pricing</button></Link>
          </div>
        </nav > */}
        <div className="empty"><span> . . . </span></div>
        <div id="splash-nav-right">
          <Link to="/login" id="splash-login-link"><button type="button"> Log In </button></Link>{" "}
          <Link to="/signup" id="splash-signup-link"><button type="button"> Try for free </button></Link>
        </div>
      </div>
    </div>

  )
}

export default SplashNav;

// Hierarchy
// id "splash-nav-wrapper"
//    id "splash-nav"
//      id "splash-nav-items"
//        id "splash-nav-logo"
//          id "splash-logo"
//        class "splash-nav-item"
//          class "splash-nav-dropdown"
//        class"splash-nav-item"
//          class "splash-nav-dropdown"
//        class "splash-nav-item"
//      id "splash-login-link"
//      id "splash-signup-btn"





// {
//   Object.keys(splashNavLeft).map((navItemTitle, idx) => {
//     let { paths, type, children } = splashNavLeft[navItemTitle];
//     return (
//       <SplashNavItem key={`navItem-${idx}`} title={navItemTitle} paths={paths} type={type} children={children} />
//     )
//   })
// }
import React from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(`mounted Sidebar`);
  }

  render() {
    return (
      <div id="sidebar">
        <div id="sidebar-top">
          <div className="logo">
            <img src={window.logoMainURL} alt="azena logo" />
          </div>
          <div className="sidebar-menu-button">
            <img src={window.chevronCircleLeft} alt="sidebar close button" />
          </div>
        </div>
        <div id="sidebar-links">
          <Link to="/home"><img className="sidebar-icon" src={window.homeIcon} alt="homeicon" />&nbsp; Home </Link>
          <Link to="/home"><img className="sidebar-icon" src={window.checkCircle} alt="taskicon" />&nbsp; My Tasks </Link>
        </div>
        <div id="sidebar-workspaces">
          {/* for each user's workspace, create workspace title (link to workspace page) + div dropdown */}
          {/* for each workspace div, add list of project links */}
          <Link to="/home" className="sidebar-workspace-title">Workspace 1</Link>
          <div className="sidebar-workspace-box">
            <div className="sidebar-workspace-projects">
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 1</Link>
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 2</Link>
              <Link to="/home" className="sidebar-workspace-project"> <span></span>&nbsp; Project 3</Link>
            </div>
            <div id="sidebar-workspace-bottom">
              <p>
                Invite your team and start collaborating!
              </p>
              <button type="button">Invite to Asana</button>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}
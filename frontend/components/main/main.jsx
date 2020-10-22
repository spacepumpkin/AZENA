import React from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";

import SidebarContainer from "./sidebar/sidebar_container"; // always there
import TopBarContainer from "./topbar/topbar_container";    // always there
import ContentBoxContainer from "./content_box/content_box_container"; // always there

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = `azena - Main`;
    console.log(`mounted Main (${this.props.page})`);
  }

  render() {
    const { page } = this.props;

    // Things to pass to TopBarContainer
    // if Home, title == "Home"
    // if Workspace, title == "workspaces[:id].name"
    // if Project, title == "projects[:id].name"


    return (
      <div id="main-wrapper">
        <div id="main">
          <SidebarContainer />
          <div id="mainbox">
            <div id="topbar">
              
              <TopBarContainer page={page} />
              <div id="topbar-user">
                {/* User Settings + TaskSearch + Global Actions */}
                <button type="button" onClick={this.handleLogout}>Log Out</button>
              </div>
            </div>
            
            <ContentBoxContainer page={page} />
            {/* <Switch> */}
              {/* <Route exact path="/home" container={ContentBoxContainer} /> */}
              {/* <ProtectedRoute exact path="/workspace/:workspaceId" container={ContentBoxContainer} /> */}
            {/* </Switch> */}
          </div>
        </div>
      </div>
    );
  }
}
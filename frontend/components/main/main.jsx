import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../../util/route_util";

// import SidebarContainer from "./sidebar/sidebar_container"; // always there
// import TopBarContainer from "./topbar/topbar_container";    // always there
import ContentBoxContainer from "./content_box/content_box_container"; // always there

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    // console.info(props);
  }

  componentDidMount() {
    document.title = `azena - Main`;
    // console.log(`mounted Main (${this.props.page})`);

    // Testing fetch for workspaces -> will be removed when we have fetchEverything
    // this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  render() {
    const { page } = this.props;
    const workspaces = this.props.payload.entities.workspaces || {};
    const urlPath = this.props.match.path || "/home";
    // Things to pass to TopBarContainer
    let that = this;
    // let title = "";
    // if (workspaces !== undefined || workspaces.length !== 0) {
    //     title = ((path) => {
    //     switch (path) {
    //       case "/workspaces/:workspaceId":
    //         return workspaces[that.props.match.params.workspaceId].name;
    //       default:
    //         return "Home";
    //     } 
    //   })(urlPath);
    // }
    // if match.path === "/home", title == "Home"
    // if match.path === "/workspaces/:workspaceId" {} title == "workspaces[:id].name"
    // if Project, title == "projects[:id].name"


    return (
      <div id="main-wrapper">
        <div id="main">
          <SidebarContainer workspaces={workspaces}/>
          <div id="mainbox">
            <div id="topbar">

              <TopBarContainer title={title} />
              <div id="topbar-user">
                {/* User Settings + TaskSearch + Global Actions */}
                <button type="button" onClick={this.handleLogout}>Log Out</button>
              </div>
            </div>

            {/* <Switch>
              <Route exact path="/home" component={}/>
              <Route path="/test1" render={() => <div className="testbox" >test 1!</div>} />
              <Route path="/test2" render={() => <div className="testbox">test 2!</div>} />
            </Switch> */}

            
            <ContentBoxContainer />
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
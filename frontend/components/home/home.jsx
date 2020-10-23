import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Home page");
    this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  render() {
    // const { page } = this.props;
    // const workspaces = this.props.payload.entities.workspaces || {};
    // const urlPath = this.props.match.path || "/home";
    // Things to pass to TopBarContainer
    let that = this;
    return (
      <div id="main-wrapper">
        <div id="main">
          <div id="mainbox">
            Hello I'm home!
          </div>
        </div>
      </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route
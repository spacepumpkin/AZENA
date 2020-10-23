import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Home page");
    // this.props.payload.workspaces !== {} && this.props.fetchUserWorkspaces();
  }

  render() {
    const {entities, session} = this.props.payload;
    const { users, workspaces, projects } = entities;

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
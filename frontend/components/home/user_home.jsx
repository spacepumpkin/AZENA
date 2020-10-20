import React from "react";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
    console.log("routed to Home page");
  }
  
  handleLogout(evt) {
    evt.preventDefault();
    this.props.logout() //.then(() => this.props.history.push("/"));
  }

  render() {
    return (
      <div>
        <div id="logo">
          <img src={window.logoMainURL} />
        </div>
        <h1>&#x2692; UserHomepage under construction &#x2692;</h1>
        <button type="button" onClick={this.handleLogout}>Log Out</button>
      </div>
    )
  }
}

// recent changes: removed window.currentUser requirement for logout button after making it a protected route
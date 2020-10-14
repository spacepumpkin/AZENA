import React from "react";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
  }
  
  handleLogout(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/"));
  }

  render() {
    return (
      <div>
        <div id="logo">
          <img src={window.logoMainURL} />
        </div>
        <h1>&#x2692; UserHomepage under construction &#x2692;</h1>
        {window.currentUser && <button type="button" onClick={this.handleLogout}>Log Out</button>}
      </div>
    )
  }
}
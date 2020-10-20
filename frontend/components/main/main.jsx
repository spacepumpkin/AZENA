import React from "react";

// import SidebarContainer from "./sidebar/sidebar_container";
// import MainBoxContainer from "./main_box/main_box_container";
import Sidebar from "./sidebar/sidebar";
import MainBox from "./main_box/main_box";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = `azena - ${this.props.page}`;
    console.log(`routed to ${this.props.page} page`);
  }

  render() {

    return (
      <div id="main-wrapper">
        <div id="main">
          <Sidebar />
          <MainBox logout={this.props.logout} history={this.props.history} />
        </div>
      </div>
    );
  }
}
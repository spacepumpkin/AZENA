import React from "react";
import { Switch } from "react-router-dom";

export default class ContentBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="main-content-wrapper">
        <h1>&#x2692; {this.props.page} page under construction &#x2692;</h1>
        {/* WorkspaceBox or HomeBox or ProjectHeader or UserBox */}
        <Switch>
          
        </Switch>
      </div>
    )
  }
};
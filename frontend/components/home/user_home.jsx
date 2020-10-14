import React from "react";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== "azena") { document.title = "azena" };
  }
  
  render() {
    return (
      <div>
        <div id="logo">
          <img src={window.logoMainURL} />
        </div>
        <h1>&#x2692; UserHomepage under construction &#x2692;</h1>
      </div>
    )
  }
}
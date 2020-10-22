// Workspace Main Box
// has: description + list of members + list of projects

import React from "react";

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    console.log("rendering Workspace...")

    // const { description } = this.props;

    return (
      <>
        <div id="workspace-leftpane">
          <div id="workspace-description">
            <div id="workspace-description-title">
              Description
            </div>
            <form>
              <textarea id="workspace-description-text" placeholder="Click to add team description...">
                {/* {workspace.description} */}
              </textarea>
            </form>
          </div>
          <div id="workspace-members">
            <div id="workspace-members-title">
              Members
            </div>
            <div id="workspace-members-list">
              <ul>
                Members List
              </ul>
            </div>
          </div>

        </div>
      </>
    )
  }
};
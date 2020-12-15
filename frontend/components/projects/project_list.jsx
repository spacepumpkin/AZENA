import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.title !== this.props.project.name) { document.title = this.props.project.name };
  }

  componentDidUpdate() {
    if (document.title !== this.props.project.name) { document.title = this.props.project.name };
  }

  render() {
    const { projectId, projectTasks, usersTasks } = this.props;

    return (
      <div id="project-list">
        <div className="sidebar-workspace-projects">
          <h1>Project Tasks</h1>
          {
            Object.values(projectTasks).map((task) => {
              return (
                <li key={`task-${task.id}`}>{task.name}</li>
                // <Link to="/home" key={`project-${project.id}`} className="sidebar-workspace-project"><span></span>&nbsp;{project.name}</Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}
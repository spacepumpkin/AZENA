import React from "react";
import { Link, NavLink } from "react-router-dom";

import ProjectTaskRow from './project_task_row';
import ProjectTaskCreateRow from './project_task_create_row';

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);

    // this._nullState = {
    //   name: "",
    //   description: "",
    //   dueDate: ""
    // };

    // this.state = Object.assign({}, this._nullState);

    // this.handleChange = this.handleChange.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    if (this.props.project === undefined) return;
    if (document.title !== this.props.project.name) { document.title = this.props.project.name };
  }

  componentDidUpdate() {
    // if (this.props.project === undefined) return;
    // if (document.title !== this.props.project.name) { document.title = this.props.project.name };
  }

  // handleKeyDown(evt) {
  //   if (evt.key === "Enter" || evt.keyCode === 13) {
  //     evt.preventDefault();
  //     evt.target.blur();
  //   }
  // }

  // handleChange(field) {
  //   return (evt) => {
  //     this.setState({ [field]: evt.target.value });
  //   };
  // }

  // handleBlur(field) {
  //   return (evt) => {
  //     if (evt.target.value !== "") {
  //       // const updatedTask = Object.assign({}, task, { [field]: evt.target.value });
  //       // dispatch(updateTask(updatedTask));
  //       this.props.createTask({ name: evt.target.value, projectId: this.props.projectId });
  //       this.setState(this._nullState);
  //     }
  //   };
  // }

  render() {
    const { project, projectId, projectTasks, usersTasks, createTask } = this.props;
    if (typeof projectId !== 'number' || project === undefined) return null;

    const ProjectTaskRows = Object.values(projectTasks).map((task) => {
      return (
        <ProjectTaskRow task={task} key={`task-${task.id}`}
          destroyTask={this.props.destroyTask}
          updateTask={this.props.updateTask}
        />
      )
    });

    return (
      <div id="project-list">
        <h1>Project Tasks</h1>
        <div className="project-tasks-list">
          <div className="project-tasks-head">
            <div className="project-task-title" > {"Task Name"} </div>
            <div className="project-task-title" > {"Description"} </div>
            <div className="project-task-title" > {"Due Date"} </div>
          </div>
          { ProjectTaskRows }
          <ProjectTaskCreateRow projectId={projectId} createTask={createTask} />
        </div>
      </div>
    )
  }
}
import React from 'react';

class ProjectTaskRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.task.name,
      // description: props.task.description,
      // dueDate: props.task.dueDate,
      // done: props.task.done,
      // projectId: props.task.projectId
    }

    // this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck() {
    // const updatedTask = Object.assign({}, task, { done: !task.done });
    // dispatch(toggleDone(updatedTask));
    this.props.updateTask({ id: this.props.task.id, done: !this.props.task.done }).then((res) => console.log("updated task, res: ", res));
  }

  handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
    }
  }

  // handleChange(field) {
  //   return (evt) => {
  //     this.setState({ [field]: evt.target.value });
  //   };
  // }

  handleBlur(field) {
    return (evt) => {
      if (evt.target.value !== this.props.task[field]) {
        this.props.updateTask({ id: this.props.task.id, [field]: evt.target.value });
      }
    };
  }
  render() {
    const { task, destroyTask } = this.props;

    return (
      <div className="project-task-row" >
        <div className="task-check-wrapper">
          <button className={`project-task-check${task.done ? " task-done" : ""}`} type="button"
            onClick={this.toggleCheck}
          />
        </div>
        <input className={`project-task-input task-input${task.done ? " task-done" : ""}`} defaultValue={task.name} type="text"
          onKeyDown={this.handleKeyDown}
          // onChange={this.handleChange("name")}
          onBlur={this.handleBlur("name")}
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
        />
        <button className={"plus-button rotated-plus"} type="button" onClick={() => destroyTask(task.id)} />
        <div>
          {/* <input disabled defaultValue={task.dueDate} type="text" /> */}
        </div>
      </div>
    )
  }
}

export default ProjectTaskRow;